function crossInSquare(sideWidth, symbol){
    // if(typeof sideWidth !== 'number') throw new Error('sideWidth must be number!');
    // if(sideWidth < 4) throw new Error('sideWidth must be number!');

    let res = symbol.repeat(sideWidth) + '\n'; // top line

    //mid cross
    let space = sideWidth - 4;
    for(let i = 0; i < sideWidth - 2; i++){
        res += symbol + ' '.repeat(i) + symbol + ' '.repeat(Math.abs(space)) + symbol + ' '.repeat(i) + symbol + '\n';
        space -= 2;
    }

    
    return res + symbol.repeat(sideWidth); // bottom line
}


console.log(crossInSquare(10, '#'));