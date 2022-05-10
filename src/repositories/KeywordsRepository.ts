import { IKeywordsRepository } from '../interfaces/IKeywordsRepository';
import { getManager } from 'typeorm';
import { Keyword } from 'src/entities/keyword.entity';
import { UpdateKeywordDto } from 'src/dto/keywords/update-keyword.dto';
import { CreateKeywordDto } from 'src/dto/keywords/create-keyword.dto';
import { REQUEST } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';
import { XMLHttpRequest } from 'xhr2';
import 'cross-fetch/polyfill';
import https from 'https';
import { json, request, Request } from 'express';

export class KeywordsRepository implements IKeywordsRepository {
  private puppeteer = require('puppeteer');
  private http:HttpService;
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

    async create(keyword: CreateKeywordDto): Promise<Keyword> {
      const manager = getManager();
      const relatedKeyword = keyword.keywords.replace(/\s/g,"+")
      const e = await manager.query(
        `
          INSERT INTO ranking.keywords ("keywords","country","siteid","lastcheck")
          VALUES (
            '${relatedKeyword}',
            '${keyword.country}',
            '${keyword.siteid}',
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
        let position = lastPosition[0].position;
        const updatedPost = await this.checkPage(infos,url);
        if(position == undefined || position == null){
          console.log("Error");
        }
        else 
        {
          await this.upCreatePos(id,position);
          await manager.query(
            `
              UPDATE ranking.keywords 
              SET lastcheck = NOW()::TIMESTAMP, position = '${updatedPost}'
              WHERE id = '${id}'
            `
            );
        }
    }

    async checkPage(infos, url)
    {
      var info = await this.infoProxy();
      let nb=0;
      const browser = await this.puppeteer.launch({
        args: [ 
                `--proxy-server=${info.proxy_address}:${info.ports.http}`
              ]
      });

      const page = await browser.newPage();
      await page.authenticate({
        username:`${info.username}`,
        password:`${info.password}`,
      })

      await page.setDefaultNavigationTimeout(0);
      await page.goto(`https://www.whole-search.com/c/`);
      await page.type('#keyword', `${infos[0].keywords}`);
      await page.type('#domain', `${url}`);
      await page.click(`#${infos[0].country}`);

      page.waitForSelector('#js_button_go.p-nowrap.btn.btn-block.btn-primary');
      await page.click('#js_button_go.p-nowrap.btn.btn-block.btn-primary');
      await page.waitForSelector('.table');

      function extractItems() {
        const extractedElements = document.querySelectorAll('p.p-nowrap');
        const items = [];
        for (let element of extractedElements) {
          items.push(element.textContent);
        }
        return items;
      }
      
      let items = await page.evaluate(extractItems);

        for(let i=0; i<items.length; i++){
          nb += parseInt(items[i]); 
        }

      let moyenne = nb/items.length;
      await page.close();
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

        
      
      /*test.fetch('https://proxy.webshare.io/api/proxy/list/',{method:'GET',headers},(response) => {
        var result='';
          response.on('data', function (chunk) {
            result += chunk;
        });
          response.on('end', function () {
            console.log(JSON.stringify(result));
        });
      }).then((res) => {
        console.log(res.data);
        return res.data;
  });; 
      //request.get("https://proxy.webshare.io/api/profile/")
      //request.header("authorization : d108471eaedd8a803c3cbc15e2516704608f942c")      
      //request.get("authorization", "d108471eaedd8a803c3cbc15e2516704608f942c");
      //requests.send(new Blob());
      /*var extractedElements:any;
      request("http://proxy.webshare.io/proxy/list/download/rmueexqjeanrzdnxljjrgmihikdhzvysbvhauxoo/-/http/username/direct/", el =>extractedElements);
      const items = [];
      for (let element of extractedElements) {
        items.push(element.textContent);
      }*/
      //console.log(request);
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