const par = document.querySelectorAll('a');

const imgSrc = ['https://www.codesmith.io/hubfs/codesmith-2022/images/Immersive%20Program/Bio_picture_Alexander.jpg',
'https://www.codesmith.io/hubfs/CHACTA%20BRICE.png',
'https://www.codesmith.io/hubfs/codesmith-2022/images/Immersive%20Program/Screen%20Shot%202022-04-21%20at%2010.27.03%20AM.png',
'https://www.codesmith.io/hubfs/Codesmith_June2021/Images/Phillip%20Troutman.jpg',
'https://www.codesmith.io/hubfs/Blog%20Images/Author%20Headshots/will-sentance.jpg',
'https://www.codesmith.io/hubfs/Akash%20Patel%2c%20Engineering%20Fellow.jpg',
'https://www.codesmith.io/hubfs/Alex-sized.jpg',
'https://www.codesmith.io/hubfs/Headshots/Bio_picture_Alexander.jpg',
'https://www.codesmith.io/hubfs/Screen%20Shot%202022-11-29%20at%203.57.48%20PM.png',
'https://www.codesmith.io/hubfs/Gahl%20Headshot.jpg',
'https://www.codesmith.io/hubfs/IMG_1680.jpeg',
'https://www.codesmith.io/hubfs/Screen%20Shot%202022-11-29%20at%203.54.24%20PM.png',
'https://www.codesmith.io/hubfs/IMG_9007%20%281%29%20%281%29.jpeg',
'https://www.codesmith.io/hubfs/Si%20Young%20Mah%2c%20Engineering%20Fellow.jpg'
]; 



const allImages = document.querySelectorAll('img');
for(let i = 0; i < allImages.length; i++){
    allImages[i].classList.add('waldo');
}

// let cache = {};
let score = 0;

// console.log(par[1].parentElement.nodeName)

for (let i = 0, j = 0; j < imgSrc.length; i += Math.floor(par.length/imgSrc.length) - 20, j += 1) {
//   console.log(par[i])
// console.log(par[i].parentElement)
if(j === 1){
    i += 100;
  }
  const newImg = document.createElement('img');
  newImg.setAttribute('src', imgSrc[j]);
  newImg.classList.add('staff');
  newImg.classList.add('waldo');
  newImg.classList.add(`staff${j}`)
  newImg.style.width = '20px';
  newImg.style.height = '20px';
  newImg.style.borderRadius = '10px';
  par[i].insertAdjacentElement('afterend', newImg);
  newImg.addEventListener('click', () => {
    score += 1;
    if(score === 14){
        alert('Congratulations! You found Waldo!')
    } else {
        alert(`Your score is now ${score} out of 14!`)
    }
    if(score === 5){
        setTimeout( () => {prompt = prompt('What would you like to ask ChatGPT?');
        chat(prompt)}, 1000);
    }
  })
}


function chat(prompt){
    let apiKey = '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';
    let endpoint = 'https://api.openai.com/v1/engines/davinci/completions';
    
    
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 100
      })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
      alert(`You asked: ${prompt} \n ChatGPT's response was: ${data.choices[0].text}`);
    });
}




