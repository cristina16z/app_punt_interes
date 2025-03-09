class PuntInteres{
    static totalTasques = 0;
    #id;
    #esManual; 

    constructor(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio) {
        this.#id = id;
        this.#esManual = esManual;
        this.pais = pais;
        this.ciutat = ciutat;
        this.nom = nom;
        this.direccio = direccio;
        this.tipus = tipus;
        this.latitud = latitud;
        this.longitud = longitud;
        this.puntuacio = puntuacio;
        PuntInteres.totalTasques++;
    }
    

    get id() {
        return this.#id;
    }
    
    set id(id) {
        this.#id = id;
    }
    

    get esManual() {
        return this.#esManual;
    }
    
    set esManual(esManual) {
        this.#esManual = esManual;
    }
    
   
    static obtenirTotalElements() {
        return PuntInteres.totalTasques;
    }
}



/************************************************************ CLASS ATRACCIÓ **********************************************/


class Atraccio extends PuntInteres {
    static IVAS = {
        "España": 1.21,
        "Italia": 1.22,
        "Francia": 1.20
    };
    
    constructor(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio, horaris, preu, moneda) {
        super(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio);
        this.horaris = horaris;
        this.preu = preu;
        this.moneda = moneda;
    }
    

    get preuIva() {

        if (this.preu === 0) {
            return "Entrada gratuïta";
        }

        //Busca el valor del iva corresponent de l'atracció, sino el troba retorna 1, que significa que no té iva.
        let iva = Atraccio.IVAS[this.pais] || 1;
        //Preu final = preu * iva, arrodonint amb 2 xifres
        let preuFinal = (this.preu * iva).toFixed(2);
        let etiquetaIVA = iva > 1 ? "(IVA)" : "(no IVA)";
        //Sortida: Preu final + moneda + si té iva o no. Depenent si l'iva és major a 1.
        return `${preuFinal}${this.moneda} ${etiquetaIVA}`;
    }
}



/************************************************************** CLASS MUSEU ************************************************/


class Museu extends PuntInteres {
    constructor(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio, horaris, preu, moneda, descripcio) {
        super(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio);
        this.horaris = horaris;
        this.preu = preu;
        this.moneda = moneda;
        this.descripcio = descripcio;
    }
    
    get preuIva() {

        if (this.preu === 0) {
            return "Entrada gratuïta";
        }

        let iva = Atraccio.IVAS[this.pais] || 1;
        let preuFinal = (this.preu * iva).toFixed(2);
        let etiquetaIVA = iva > 1 ? "(IVA)" : "(no IVA)";
        
        return `${preuFinal}${this.moneda} ${etiquetaIVA}`;
    }
}