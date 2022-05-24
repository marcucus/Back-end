import { IKeywordsRepository } from '../interfaces/IKeywordsRepository';
import { getManager } from 'typeorm';
import { Keyword } from 'src/entities/keyword.entity';
import { UpdateKeywordDto } from 'src/dto/keywords/update-keyword.dto';
import { CreateKeywordDto } from 'src/dto/keywords/create-keyword.dto';
import { HttpService } from '@nestjs/axios';
import 'cross-fetch/polyfill';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { parse } from 'node-html-parser';
import { JwtService } from '@nestjs/jwt';


export class KeywordsRepository implements IKeywordsRepository {
  private http:HttpService;
  private JwtService = new JwtService({
    secret: process.env.ACCESS_SECRET,
    signOptions: { expiresIn: '7d' },
  });
    async findOne(id: string): Promise<Keyword| null> {
      const manager = getManager();
      const response = await manager.query(
        `
          SELECT *
          FROM ranking.keywords
          WHERE id = $1
          LIMIT 1
        `,
        [id],
      );
  
      return (response[0] as Keyword) || null;
    }

    async find(): Promise<Keyword| null> {
      const manager = getManager();
      const response = await manager.query(
        `
          SELECT ranking.keywords.id,ranking.keywords.keywords,ranking.positions.lastposition,ranking.positions.date
          FROM ranking.positions
          INNER JOIN ranking.keywords ON ranking.positions.keywordid=ranking.keywords.id 
        `,
      );
  
      return (response as Keyword) || null;
    }

    async findAllbySite(id){
      console.log(id);
      const manager = getManager();
      const response = await manager.query(
        `
        select k.id,k."position",k.keywords,k.country,k.siteid,k.lastcheck,k.createdAt,s.url,
        json_build_object('pos', jsonb_agg(json_build_object(  
          'pid', p.id,
          'ppos', p.lastposition,
          'pkid',p.keywordid,
          'pdate',p."date")))
        from ranking.keywords k,ranking.positions p,ranking.sites s
        where s.id=${id} AND k.siteid=${id}
        group by k.id,s.url
        `,
      );
      console.log(response);
      return response;
    }

    async keywordUser(token){
      var decoded = this.JwtService.decode(token);
      var id = decoded.sub;
      const manager = getManager();
      const response = await manager.query(
        `
        SELECT k.id,k."position",k.keywords,k.country,k.siteid,k.lastcheck,k.createdAt,s.url,
          json_build_object('pos', jsonb_agg(json_build_object(  
            'pid', p.id,
            'ppos', p.lastposition,
            'pkid',p.keywordid,
            'pdate',p."date")))
          FROM ranking.users u
          INNER JOIN ranking.sites s ON u.id=s.userid 
          INNER JOIN ranking.keywords k ON s.id=k.siteid 
          INNER JOIN ranking.positions p ON k.id = p.keywordid
          WHERE u.id=${id}
          GROUP BY k.id,s.url
        `
      )
      return response;
    }

    async create(keyword: CreateKeywordDto): Promise<Keyword> {
      const manager = getManager();
      const relatedKeyword = keyword[0].keywords.replace(/\s/g,"+")
      const e = await manager.query(
        `
          INSERT INTO ranking.keywords ("keywords","country","siteid","lastcheck","createdat")
          VALUES (
            '${relatedKeyword}',
            '${keyword[0].country}',
            '${keyword[0].siteid}',
            NOW()::TIMESTAMP,
            NOW()::TIMESTAMP
          ) 
          RETURNING ranking.keywords.id;
        `
      );
      await this.checkPos(e[0].id);
      return e;
    }

    async upCreatePos(id,position)
    {
      const manager = getManager();
      const response = await manager.query(
        `
          INSERT INTO ranking.positions ("lastposition","keywordid","date")
          VALUES (
            '${position}',
            '${id}',
            NOW()::TIMESTAMP
          );
        `
        );
      return response;
    }

    async update(id: string, keyword : UpdateKeywordDto){
      const manager = getManager();
      const relatedKeyword = keyword.keywords.replace(/\s/g,"+")
      const response = await manager.createQueryBuilder()
        .update('ranking.keywords')
        .set({ keywords:relatedKeyword })
        .where("id = :id", { id: id })
        .execute();
        return response;
    }

    async checkPos(id: string){
      await this.addRequest();
      var urltest ='';
      var url ='';
      const manager = getManager();
      const lastPosition = await manager.query(
        `
          SELECT *
          FROM ranking.keywords
          WHERE id = '${id}'
        `
      );
        const infos = await manager.query(
          `
            SELECT ranking.keywords.keywords, ranking.keywords.country, ranking.sites.url
            FROM ranking.keywords
            INNER JOIN ranking.sites ON ranking.keywords.siteid = ranking.sites.id 
            WHERE ranking.keywords.id = '${id}'
          `
        );
          if(infos[0].url.startsWith('http://'))
          {
            urltest = infos[0].url.slice(0,7);
          }
          else if(infos[0].url.startsWith('https://'))
          {
            urltest = infos[0].url.slice(0,8)
          }
          else {
            urltest = infos[0].url;
          }
          if (!urltest.startsWith('www.'))
          {
            url = "www."+urltest;
          }
          else{
            url = urltest;
          }
        let position = lastPosition[0].position;
        const updatedPost = await this.checkPage(infos,url);
        if(position == undefined || position == null){
          await manager.query(
            `
              UPDATE ranking.keywords 
              SET lastcheck = NOW()::TIMESTAMP, position = '${updatedPost}'
              WHERE id = '${id}'
            `
            );
        }
        else 
        {
          await manager.query(
            `
              UPDATE ranking.keywords 
              SET lastcheck = NOW()::TIMESTAMP, position = '${updatedPost}'
              WHERE id = '${id}'
            `
            );
          await this.upCreatePos(id,position);
        }
    }

    async parseHTML(html){
      let nb=0;

      const root = parse(html);
      function extractItems() {
        const extractedElements = root.querySelectorAll('p.p-nowrap');
        const items = [];
        for (let element of extractedElements) {
          items.push(element.textContent);
        }
        return items;
      }
      
      let items = extractItems();

        for(let i=0; i<items.length; i++){
          nb += parseInt(items[i]); 
        }

        let moyenne = nb/items.length;
        return moyenne;
    }

    async checkPage(infos, url)
    {
      var info = await this.infoProxy();
      var ulrs = require('url');
      let nb=0;
      var html:string;
      var proxyOpts = ulrs.parse(`${info.proxy_address}:${info.ports.http}`);
      proxyOpts.auth = `'${info.username}:${info.password}'`;
      const proxyAgent = new HttpsProxyAgent(proxyOpts);
      const response = await fetch(`https://www.whole-search.com/Google/fr-fr/index.asp?keyword=${infos[0].keywords}&domain=${url}&${infos[0].country}=1`,
      {headers:{
          'Accept':'application/json,application/xhtml+xml,application/html',
          'Content-Type': 'application/json',
          Referer:'https://www.whole-search.com/',
          Agent:`${proxyAgent}`
        }
      })
      .then(result => result.text())
      .then(data => html = data)
      .catch(function(error){
        if(error) throw new Error(error)
      });
      let moyenne = await this.parseHTML(html);
      return moyenne;
    }

    async addRequest(){
      const manager = getManager();
      const nbRequest = await manager.query(
        `
          SELECT *
          FROM ranking.request
        `
      );
      if(nbRequest[0].number<=199){
        const response = await manager.query(
          `
            UPDATE ranking.request
            SET number=number+1
          `
          );
        return response;
      }
      else {
        this.resetProxy();
          const response = await manager.query(
            `
              UPDATE ranking.request
              SET number=0
            `
            );
          return response;
      }

    }

    async resetProxy(){
      const manager = getManager();
        const nbprox = manager.query(
          `
            SELECT proxy
            FROM ranking.request
          `
          );
      if(nbprox[0].proxy <= 9)
      {
        await manager.query(
          `
            UPDATE ranking.request
            SET proxy=proxy+1
          `
        );
      }
      else{
        this.resetProxyList();
        await manager.query(
          `
            UPDATE ranking.request
            SET proxy=0
          `
        );
      }
    }

    async resetProxyList(){
      var headers: HeadersInit = {Authorization : "d108471eaedd8a803c3cbc15e2516704608f942c"};
      fetch("https://proxy.webshare.io/api/proxy/replacement/", {method:"GET", headers:headers})
      .then(function(response){
        var proxy = response.json();
        console.log(proxy);
      });
    }

    async infoProxy(){

      const manager = getManager();
      var i = await manager.query(
        `
          SELECT proxy
          FROM ranking.request
        `
      );
      var nb = i[0].proxy;

      var headers: HeadersInit = {Authorization : "d108471eaedd8a803c3cbc15e2516704608f942c"};
      const response = await fetch("https://proxy.webshare.io/api/proxy/list/", {method:"GET", headers:headers});
      const data = await response.json();
      
      return data.results[nb];
    }

    async delete(id: string){
      const manager = getManager();
      this.del(id);
      const response = await manager
      .createQueryBuilder()
      .delete()
      .from('ranking.keywords')
      .where("id = :id", { id: id })
      .execute();
      return response;
    }

    async del(id:string)
    {
      const manager = getManager();
      const response = await manager.query(
        `
        DELETE FROM ranking.positions
        WHERE "keywordid" =  '${id}'
        `,
        );
      return response;
    }
  }