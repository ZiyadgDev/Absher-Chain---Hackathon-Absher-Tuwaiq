class Block{
    constructor(data, previousHash = '', timestamp = Date.now()) {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return CryptoJS.SHA256(this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block("GenesisBlock", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

function HtmBlock() {
    document.getElementById("Chain").innerHTML = "";
    for (let i = 1;  i < Ziyad.chain.length; i++) {
        const newDiv = document.createElement("div");
        newDiv.id = "DataBlock";
        newDiv.innerHTML = "<h3>" + Ziyad.chain[i].data + "</h3>";
        document.getElementById("Chain").appendChild(newDiv);
    }
}

function getData() {
    const addDiv = document.getElementById("AddBlock");
    addDiv.innerHTML = '<input id="data"><input type="submit" onclick="HtmAddBlock()">';
}

function HtmAddBlock() {
    const addDiv = document.getElementById("AddBlock");
    const data = document.getElementById("data").value;
    Ziyad.addBlock(new Block(data));
    HtmBlock();
    addDiv.innerHTML = '<button type="button" onclick="getData()">+</button>';
    document.getElementById("AcceptChange").innerHTML = '<h2>هل تقبل بإضافة "'+data+'"؟</h2><button type="button" id="ADbutton" onclick="Accept()">✓</button><button type="button" id="ADbutton" onclick="Decline()">✖</button>'
}

function Accept() {
    document.getElementById("AcceptChange").innerHTML = "";
    console.log(JSON.stringify(Ziyad, null, 4));
}

function Decline() {
    Ziyad.chain.pop();
    HtmBlock();
    document.getElementById("AcceptChange").innerHTML = "";
}

let Ziyad = new BlockChain();
Ziyad.addBlock(new Block("(الأسم: زياد يوسف) (الهويه: 112345678) (الموقع: السعودية/الرياض)"));
console.log("Is blockchain valid?", Ziyad.isChainValid());

HtmBlock();
