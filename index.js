require ('dotenv').config();
const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async()=>{
    const busquedas = new Busquedas();
    
    let opt;


    do{
        opt = await inquirerMenu();
        

        switch(opt){
            case 1:
                //mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                
               
                //buscar lugar
                const lugares = await busquedas.ciudad(termino);
                //seleccionar lugar
                const id = await listarLugares(lugares);
                if(id === '0') continue;

                //guardar en db
                const lugarSel = lugares.find(l=> l.id === id);
                busquedas.agregarHistorial(lugarSel.nombre);

                //clima 
                const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng);
                //mostrar resultados
                console.log('\ninformacion de la Ciudad\n'.green);
                console.log('Ciudad: ', lugarSel.nombre);
                console.log('lat: ',lugarSel.lat);
                console.log('Lng: ',lugarSel.lng);
                console.log('Temperatura: ',clima.temp);
                console.log('Temperatura min: ',clima.min);
                console.log('Temperatura max: ',clima.max);
                console.log('Como esta el clima',clima.desc);
            break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar,i)=>{
                    const idx = `${i + 1 }.`.green;
                    console.log(`${idx} ${lugar}`);
                })
            break;
        }

        if(opt !== 0) await pausa();
     
    }while(opt !== 0)
}
main();