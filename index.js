let newString = '';
function reverseString(string){
    const ne = string.split(' ');
    ne.forEach(element => {
        for (let i = element.length-1; i >=0; i--) {
            newString += element[i];        
        }
        console.log(newString);
    });
}

function solution(N) {
    const bin = N.toString(2);
    // console.log(bin);
    let current_gap = 0;
    let gaps = [];
    for (let i = 0; i < bin.length; i++) {
        if(bin[i]==0){
            current_gap++;
        }
        else{
            if(current_gap!=0){
                gaps.push(current_gap);
                current_gap = 0;
            }
        }
    }
    // console.log(gaps);
    if(gaps.length<=0){
        return 0;
    }
    // console.log(gaps);
    // console.log(Math.max.apply(null,gaps));
    return Math.max.apply(null,gaps);
}


// reverseString("Hello World");

// solution(32);


// unpair element

function unpair(A){
    let container = [];
    for (let i = 0; i < A.length; i++) {
        if(container.includes(A[i])){
            // console.log(i +'=>'+A[i]);
            // console.log(container);
            container.splice(container.indexOf(A[i]),1);
            // console.log(container);
        }
        else{
            container.push(A[i]);
            // console.log(container);
        }
    }
    // console.log(A);
    return container[0];
    // console.log(notpair);
}

unpair([9, 3, 9, 3, 9, 7, 9]);