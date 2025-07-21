import "dotenv/config";
const { drizzle } =require("drizzle-orm/neon-http");

import * as schema from "../db/schema";
import { neon } from "@neondatabase/serverless";
import { title } from "process";

const sql = neon(process.env.DATABASE_URL!); 

const db = drizzle(sql,{schema});

const main = async () =>{
    try{
        console.log("Semeando banco de dados");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengesOptions);
        await db.delete(schema.challengeProgress);


        await db.insert(schema.courses).values([{
            id:1,
            title:"Administração",
            imageSrc:"/adm.svg"
        },
       {
            id:2,
            title:"Comunicação",
            imageSrc:"/com.svg"
        },
    
       {
            id:3,
            title:"Comercio",
            imageSrc:"/comercio.svg"
        },

       {
            id:4,
            title:"Segurança",
            imageSrc:"/sec.svg"
        },

       {
            id:5,
            title:"Tecnologia",
            imageSrc:"/tec.svg"
        }
    ]);

    await db.insert(schema.units).values([
        {
            id:1,
            courseId:1,
            title:"Unidade 1",
            description:"Principios da administração",
            order:1,
        },

        {
            id:2,
            courseId:2,
            title:"Unidade 1",
            description:"Principios da administração",
            order:1,
        }
    ]);


    await db.insert(schema.lessons).values([
    {
        id:1,
        unitId:1,
        order:1,
        title:"Tipos de Administração"
    },

    {
        id:2,
        unitId:1,
        order:2,
        title:"Principios da Administração"
    },    
    {
        id:3,
        unitId:1,
        order:3,
        title:"Principios da Administração"
    },
    {
        id:4,
        unitId:1,
        order:4,
        title:"Principios da Administração"
    },

    {
        id:5,
        unitId:1,
        order:5,
        title:"Principios da Administração"
    }

]);

await db.insert(schema.challenges).values([
    {
        id:1,
        lessonId:1,
        type:"SELECT",
        order:1,
        question:'Qual a principal caracteristica da "Administração pública"'
    },
        {
        id:2,
        lessonId:1,
        type:"ASSIST",
        order:2,
        question:'Qual a principal caracteristica da "Administração pública"'
    },        {
        id:3,
        lessonId:1,
        type:"ASSIST",
        order:3,
        question:'Qual a principal caracteristica da "Administração pública"'
    },
]);


await db.insert(schema.challenges).values([
    {
        id:4,
        lessonId:2,
        type:"SELECT",
        order:1,
        question:'Qual a principal caracteristica da "Administração pública"'
    },
        {
        id:5,
        lessonId:2,
        type:"ASSIST",
        order:2,
        question:'Qual a principal caracteristica da "Administração pública"'
    },        {
        id:6,
        lessonId:2,
        type:"ASSIST",
        order:3,
        question:'Qual a principal caracteristica da "Administração pública"'
    },
]);


await db.insert(schema.challengesOptions).values([
    {
        id:1,
        challengeId:1,
        imageSrc:"/teste.svg",
        correct:true,
        text:"Visa atender ao interesse público e ao bem coletivo",
        audioSrc:"/teste.mp3"
    },

        {
        id:2,
        challengeId:1,
        imageSrc:"/teste.svg",
        correct:false,
        text:"Tem como foco principal os interesses individuais dos servidores públicos",
        audioSrc:"/teste.mp3"
    },

        {
        id:3,
        challengeId:1,
        imageSrc:"/teste.svg",
        correct:false,
        text:"Atua de forma privada, sem interferência de leis ou normas",
        audioSrc:"/teste.mp3"
    },

        {
        id:4,
        challengeId:1,
        imageSrc:"/teste.svg",
        correct:false,
        text:"É voltada para o lucro e maximização dos resultados financeiros",
        audioSrc:"/teste.mp3"
    },

]),


await db.insert(schema.challengesOptions).values([
    {
        id:5,
        challengeId:2,
        correct:true,
        text:"Visa atender ao interesse público e ao bem coletivo",
        audioSrc:"/teste.mp3"
    },

        {
        id:6,
        challengeId:2,
        correct:false,
        text:"Tem como foco principal os interesses individuais dos servidores públicos",
        audioSrc:"/teste.mp3"
    },

        {
        id:7,
        challengeId:2,
        correct:false,
        text:"Atua de forma privada, sem interferência de leis ou normas",
        audioSrc:"/teste.mp3"
    },

        {
        id:8,
        challengeId:2,
        correct:false,
        text:"É voltada para o lucro e maximização dos resultados financeiros",
        audioSrc:"/teste.mp3"
    },

]),


await db.insert(schema.challengesOptions).values([
    {
        id:9,
        challengeId:3,
        correct:true,
        text:"Visa atender ao interesse público e ao bem coletivo",
        audioSrc:"/teste.mp3"
    },

        {
        id:10,
        challengeId:3,
        correct:false,
        text:"Tem como foco principal os interesses individuais dos servidores públicos",
        audioSrc:"/teste.mp3"
    },

        {
        id:11,
        challengeId:3,
        correct:false,
        text:"Atua de forma privada, sem interferência de leis ou normas",
        audioSrc:"/teste.mp3"
    },

        {
        id:12,
        challengeId:3,
        correct:false,
        text:"É voltada para o lucro e maximização dos resultados financeiros",
        audioSrc:"/teste.mp3"
    },

]),

    console.log("Banco de dados Finalizado")

    }catch(error){
        console.error(error);
        throw new Error("Falha ao procurar")
    }
}

main();