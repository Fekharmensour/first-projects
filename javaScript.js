// start game 
document.querySelector(".control-button span").onclick=function(){
    let y_name = prompt(" What is your Name" );
    
    if ( y_name == null || y_name=="" ){
        document.querySelector(".info-continner .name span").innerHTML= "Unknown"
    }else  document.querySelector(".info-continner .name span").innerHTML= y_name
    document.querySelector(".control-button").remove();
}
// create rate and display none
let rate = document.querySelector(".rusltat")
rate.style.display ="none" 
let tryed = document.querySelector(".try")
tryed.style.display ="none"
// Effect duration 
let duration = 700

//Slect block container ".memorey-game-block"
let blockContainer = document.querySelector(".memorey-game-block")

//Create array from children of block container
let blocks = Array.from(blockContainer.children)

// Creat Rang of keys 
// you can use this : let orderRange = Array.from(Array(blocks.length).keys())
let orderRange = [...Array(blocks.length).keys()]
// appal function shuffel
shuffel(orderRange)

blocks.forEach((block , index) => {
    // add css order property 
    block.style.order = orderRange[index];
    
    // add click event 
    block.addEventListener('click',function(){
    // appale function flip 
    document.getElementById('clicked').play()   
    flip(block);
    })
})
//flip block function
function flip (elem_onclick){

    // add class is-flipped
    elem_onclick.classList.add("is-flipped")
    
    //Collecte all flipped card
    let AllFlipBlock = blocks.filter(flipBlock =>
        flipBlock.classList.contains("is-flipped")
    )
    // test if there are two elem flipped
    if(AllFlipBlock.length === 2){
        //appale  stop cliking function
        StopClick(); 
        // appale checkMach
        CheckMachBlock(AllFlipBlock[0],AllFlipBlock[1])

       // if end 
        let testing =testend()
        if (testing == true) {
            end()
        }
        
    }
        // test if your losse
        if(sup_15()){
            blockContainer.classList.add("no_click")
            click_try()
            
        }

}

// stop clicking function function 

function StopClick(elme){
    blockContainer.classList.add("no_click")
    // time to close
    setTimeout(()=>{
        // remove all class contien active
        blockContainer.classList.remove('no_click')
    },duration)
}
// function CheckMachBlock
function CheckMachBlock(firste,second){
    //creat triese
    let triesElem= document.querySelector(".tries span")
    if (firste.dataset.technology === second.dataset.technology){
        // play audio correct
        document.getElementById('Correct').play()
        // remove class is-flipped
        firste.classList.remove('is-flipped')
        second.classList.remove('is-flipped')
        // add class has-match
        firste.classList.add('has-match')
        second.classList.add('has-match')
    }else{
        // play audio wrong
        document.getElementById('wrong').play()
        triesElem.innerHTML=parseInt(triesElem.innerHTML)+1;
        setTimeout(()=>{
             // remove class is-flipped
            firste.classList.remove('is-flipped')
            second.classList.remove('is-flipped')
        },duration)
        // set a span in trise
        let nbr = parseInt(triesElem.innerHTML)
        if(nbr == 10 ){
            document.getElementById('wrong10').play()
        }
        if(nbr == 15 ){
            document.getElementById('wrong15').play()
        }

    }
}

// shuffel function
function shuffel(array){
    // setings var 
    
    let current = array.length,
    temp,
    random;
    while(current > 0){
        // Get Random nbr
        random = Math.floor(Math.random() * current );
        // descreat lenth by one 
        current--;
        // {1} save current element "save in register"
        temp = array[current]
        // {2} Current elem = random elem 
        array[current]= random
        // {3} array[random] = get from elem in register
        array[random]=temp;
    }
    return array;
}

// test end ro no 
function testend() {
    let test = blocks.filter(flipBlock =>
    flipBlock.classList.contains("has-match")
)
if (test.length == 20) {
    return true
}else return false 

}
// end function 
function end(){
    let nbr_wrong =parseInt( document.querySelector(".tries span").innerHTML)
    let span = document.querySelector(".rusltat span")
    if (nbr_wrong < 8){
        document.getElementById("win").play()
        rate.style.display = "block"
        span.innerHTML = " Great "
    }else{
        if (nbr_wrong < 15) {
            document.getElementById("win").play()
            rate.style.display = "block"
            span.innerHTML = " Goood  "
        }else {
            document.getElementById('loser').play()
            tryed.style.display = "block"
            
            
        }
    }
    
}

// test if tries > 15 
function sup_15(){
    let nbr_wrong =parseInt( document.querySelector(".tries span").innerHTML)
    if (nbr_wrong > 15) return true
    else return false 
    
}

function click_try(){
    document.getElementById('error').play()
    document.getElementById('again').play()
    
    tryed.style.display = "block"
    let tryagain = document.querySelector('.try')   
    tryagain.addEventListener('click', () => {
        // Reload the page when the "try" button is clicked
        window.location.reload();
    });

}
