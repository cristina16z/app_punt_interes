const dropZoneObj = document.querySelector(".dropZone");
let fitxer = [];
let puntInteres = [];

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
        console.log(fitxer);
    };
    reader.onerror = () => {
        showMessage("Error reading the file. Please try again.", "error");
    };
    reader.readAsText(file, "UTF-8");
    console.log("El fitxer ha començat a carregar-se");
}



const hello = function(){
    alert('hola');
}


const loadData = function(fitxer){
    fitxer.forEach((liniaCSV)=>
        {
            const dades = liniaCSV.split(CHAR_CSV);
            console.log(dades[TIPUS]);

            switch(dades[TIPUS].toLowerCase()){

                case "espai":
                    console.log("Instancia objecte PuntInteres");
                    const espaiObj = new PuntInteres(dades[PAIS], dades[CODI])
                    puntInteres.push(espaiObj);
                    break;

                case "museu":
                    console.log("Instancia objecte Museu");
                    const museuObj = new Museu()
                    puntInteres.push(museuObj)
                    break;

                case "atraccio":
                    console.log("Instancia objecte Atraccio");
                    const atraccioObj = new Atraccio()
                    puntInteres.push(atraccioObj)
                    break;
                
                default:
                    throw new Error(()=>{
                        alert("Has afegit un tipus que no és correcte");
                    });
            }
        })
}


const mapa = new Map();