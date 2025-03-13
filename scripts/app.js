const dropZoneObj = document.querySelector(".dropZone");
let fitxer = [];
let puntInteres = [];

let numId = 0;

dropZoneObj.addEventListener("dragover", function(event){
    event.preventDefault(); //que la pantalla no es refresqui i continui amb el fluxe d'execcució
    console.log("dragover");
});


dropZoneObj.addEventListener("drop", function(event){
    event.preventDefault();
    console.log("drop");
    const files = event.dataTransfer.files;
    loadFile(files);
})



const loadFile = function(files){


    if(files && files.length > 0){
        const file = files[0];
        const extensio = file.name.split(".")[1];
        if(extensio.toLowerCase() === FILE_EXTENSION){
            readCsv(file);
            console.log("El fitxer té un format correcte");
        }else{
            alert("El fitxer no té un format csv");
        }
        console.log(file);
    }
}


const readCsv = function (file){
    const reader = new FileReader();
    reader.onload = () => {
        fitxer = reader.result.trim().split("\n").slice(1);
        loadData(fitxer);
        //getInfoCountry();
        console.log(fitxer);
    };
    reader.onerror = () => {
        showMessage("Error reading the file. Please try again.", "error");
    };
    reader.readAsText(file, "UTF-8");
    console.log("El fitxer ha començat a carregar-se");
}



const getInfoCountry = async function(code_bandera){
    
    try{
        const resposta = await fetch(`https://restcountries.com/v3.1/alpha/${code_bandera}`);

        if (!resposta.ok) {
            throw new Error(`Error: ${resposta.status}`);
        }

        const dades = await resposta.json();
        console.log(dades);

        const bandera = dades[0].flags.png; 
        console.log( bandera);

        return bandera;
       
    } catch (error){
        console.error("Error obteniendo la información del país:", error);
    }
} 


const loadData = function(fitxer){
    let codiContry;
    let ciutat;
    fitxer.forEach((liniaCSV)=>
        {
            numId++;
            const dades = liniaCSV.split(CHAR_CSV);
            console.log(dades[TIPUS]);

            switch(dades[TIPUS].toLowerCase()){

                case "espai":
                    console.log("Instancia objecte PuntInteres");
                    const espaiObj = new PuntInteres(numId, false, dades[PAIS], dades[CODI], dades[CIUTAT], dades[TIPUS], dades[NOM], 
                                                        dades[DIRECCIO], dades[LAT], dades[LON], dades[PUNTUACIO]);
                    puntInteres.push(espaiObj);
                    break;

                case "museu":
                    console.log("Instancia objecte Museu");
                    const museuObj = new Museu(numId, false, dades[PAIS], dades[CODI], dades[CIUTAT], dades[TIPUS], dades[NOM], 
                                                dades[DIRECCIO], dades[LAT], dades[LON], dades[HORARIS], dades[PREU],dades[DESCRIPCIO],dades[PUNTUACIO], dades[MONEDA]);
                    puntInteres.push(museuObj);
                    break;

                case "atraccio":
                    console.log("Instancia objecte Atraccio");
                    const atraccioObj = new Atraccio(numId, false, dades[PAIS], dades[CODI], dades[CIUTAT], dades[TIPUS], dades[NOM], 
                                                    dades[DIRECCIO], dades[LAT], dades[LON], dades[HORARIS], dades[PREU], dades[PUNTUACIO], dades[MONEDA]);
                    puntInteres.push(atraccioObj);
                    break;
                
                default:
                    throw new Error(()=>{
                        alert("Has afegit un tipus que no és correcte");
                    });
            }

            codiContry = dades[CODI];
            ciutat = dades[CIUTAT];
        });
  
        if (codiContry) {
            getInfoCountry(codiContry).then(bandera => {

                console.log("Bandera:", bandera);
                const banderaDiv = document.querySelector(".bandera");
                banderaDiv.innerHTML=`<img src=${bandera} class="bandera_img"/>
                                    <div class="bandera_ciutat">${ciutat}</div>`;

            }).catch(error => {
                console.error("Error obteniendo la bandera:", error);
            });
        }

        console.log(puntInteres);
}



const pintarEspai = function(obj){
    const piEspai = document.createElement("div");
    piEspai.textContent = "";
}


const pintarMuseu = function(obj){

}


const pintarAtraccio = function(obj){

}




const renderitzarLlista = function(llista){
    fitxer.forEach((obj)=>
        {
            switch(obj.tipus.toLowerCase()){

                case "espai":
                    pintarEspai(obj);
                    break;

                case "museu":
                    pintarMuseu(obj);
                    break;

                case "atraccio":
                    pintarAtraccio(obj);
                    break;
                
                default:
                    throw new Error(()=>{
                        alert("Has afegit un tipus que no és correcte");
                    });
            }
        })

        console.log(puntInteres);
}



const mapa = new Map();