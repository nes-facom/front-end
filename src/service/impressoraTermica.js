// import escpos from 'escpos';
// import escposUSB from 'escpos-usb';

class ImpressoraTermica {
    constructor() {
        this.escpos = require('escpos')
        this.escpos.USB = require('escpos-usb')

        this.nomeEscola = "E.M. Prof Arlene M. A."
        this.conexao = null
        this.definicoes = null
        this.impressora = null

        //this.conectarImpressora("serial", "/dev/usb/lp0")
        //this.conectarImpressora("rede", "localhost")
        this.definirEndereco("usb")
        this.definirConfiguracoes("GB18030")
        this.conectarImpressora()
    }
    definirEndereco(meio, endereco=null) {
        if (meio == "usb"){
            this.conexao = new this.escpos.USB()
        } else if (meio == "serial") {
            this.conexao = new this.escpos.Serial(endereco)
        } else if (meio == "rede") {
            this.conexao = new this.escpos.Network(endereco)
        } else {
            return "Conexão inválida"
        }

    }
    definirConfiguracoes(encode) {
        this.definicoes = {
            encoding: encode
        }
    }
    conectarImpressora() {
        this.impressora = new this.escpos.Printer(this.conexao, this.definicoes)
    }
    imprimirEtiqueta(tombo) {
        this.conexao.open(function(error=null){
            this.impressora.font("a")
                    .align("ct")
                    .style("bu")
                    .size(1, 1)
                    .text(this.nomeEscola)
                    .barcode(tombo, "EAN8")
                    .text(tombo)
                    .cut()
                    .close()

            if (error != null) {
                this.conectarImpressora()
                console.log(error)
            }
        })
    }
}

const impressoratermica = new ImpressoraTermica()

impressoratermica.imprimirEtiqueta('12345678')
// export default impressoratermica