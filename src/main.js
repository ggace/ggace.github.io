/*
	This pen cleverly utilizes SVG filters to create a "Morphing Text" effect. Essentially, it layers 2 text elements on top of each other, and blurs them depending on which text element should be more visible. Once the blurring is applied, both texts are fed through a threshold filter together, which produces the "gooey" effect. Check the CSS - Comment the #container rule's filter out to see how the blurring works!
*/

const container = document.getElementById('container')
const content = document.getElementById('content')



const elts = {
	text1: document.getElementById("text1"),
	text2: document.getElementById("text2")
};

// The strings to morph between. You can change these to anything you want!
let texts = [];
let imgsComponent = PluginArray;

// Controls the speed of morphing.
const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;



let containerHeight = 100;
let contentHeight = 0;

let imgs = [
	"네이버.png",
	"kakao사옥.jpeg",
	"ncsoft.png",
	"nexon.png",
	"판교it.jpg"
]

function doMorph() {
	morph -= cooldown;
	cooldown = 0;
	
	let fraction = morph / morphTime;
	
	if (fraction > 1) {
		cooldown = cooldownTime;
		fraction = 1;
	}
	
	setMorph(fraction);
}

// A lot of the magic happens here, this is what applies the blur filter to the text.
function setMorph(fraction) {
	// fraction = Math.cos(fraction * Math.PI) / -2 + .5;
	
	elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	fraction = 1 - fraction;
	elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	elts.text1.textContent = texts[textIndex % texts.length];
	elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
	morph = 0;
	
	elts.text2.style.filter = "";
	elts.text2.style.opacity = "100%";
	
	elts.text1.style.filter = "";
	elts.text1.style.opacity = "0%";
}

function setImgs(){
	let div = <div id="imgs">
		{
			imgs.map((img, index)=> (
				<Img src={`../sources/${img}`}/>
			))
		}
		
	</div>
	
	ReactDOM.render(div, content);
	setTimeout(()=>{console.log(""); setSize(0, true)}, 3000);

	
	//;
	
}
let objHeight = 0;
let imgObj = undefined;
function setSize(index, is_up){
	imgObj = document.querySelectorAll("#imgs img")[index];
	if(is_up){
		objHeight = 0;
		setSizeUp(index);
	}
	else{
		
		objHeight = 100;
		setSizeDown(index);
	}

	
}

function setSizeUp(){
	let sizeUp = requestAnimationFrame(setSizeUp);
	
	
	
	if(objHeight >= 100){
		cancelAnimationFrame(sizeUp)
		return 0;
	}
	imgObj.style.height = (objHeight+2).toString() + "%";
	objHeight = objHeight+5;
}

function setSizeDown(index){

	let sizeDown = requestAnimationFrame(setSizeDown);

	let tempObj = document.getElementById("imgs")[index];
	let obj = tempObj.getElementsByTagName("img")[0];

	if(objHeight <= 0){
		cancelAnimationFrame(sizeDown)
		return 0;
	}
	obj.style.height = (objHeight-2).toString() + "%";
	objHeight = objHeight-5;
}

// Animation loop, which is called every frame.
function animate() {
	let animateAnimation = requestAnimationFrame(animate);
	
	let newTime = new Date();
	let shouldIncrementIndex = cooldown > 0;
	let dt = (newTime - time) / 1000;
	time = newTime;
	
	cooldown -= dt;
	
	if (cooldown <= 0) {
		if (shouldIncrementIndex) {
			textIndex++;
		}
		if(textIndex % texts.length == texts.length-1){
			setTimeout(() => {
				setImgs()
				
				setHeightContainer();
				
			}, 2000);
			cancelAnimationFrame(animateAnimation)
			return 0;
		}
		doMorph();
	} else {
		doCooldown();
	}

}

function begin(showTexts = []){

  texts = showTexts;

  elts.text1.textContent = ""
  elts.text2.textContent = ""

  textIndex = texts.length - 1;
  time = new Date();
  morph = 0;
  cooldown = cooldownTime;

  elts.text1.style.opacity = `0`;
  elts.text2.style.opacity = `0`;
  elts.text1.style.filter = `blur(100px)`;
  elts.text2.style.filter = `blur(100px)`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
  
  
  animate()
}

let plus = 3;

function setDisplay(){
	
	
	document.body.style.backgroundColor="white";
	document.body.style.color="black";
	container.style.backgroundColor="black"
	container.style.color="white"

	
}

function setHeightContainer() {
	let heightContainer = requestAnimationFrame(setHeightContainer);

	if(containerHeight <= 10){
		setDisplay();
		cancelAnimationFrame(heightContainer)
		return 0;
	}
	container.style.height = (containerHeight-plus).toString() + "%";
	content.style.height = (contentHeight+plus).toString() + "%";
	
	containerHeight -= plus;
	contentHeight += plus;
}


class Img extends React.Component{
	render() {
		const divStyle = {
			"width" : "100%",
			"height": "100%",
			"justifyContent" : "center",
			"alignItems": "flex-end",
			"display":"flex"
			
		};
		const imgStyle={
			"height": "0%"
		}
		return <div style={divStyle}><img src={this.props.src} style={imgStyle} /></div>
	}
}
// Start the animation.
begin([
	"Post Corona-19", "Tour Guide", "Mini Book", "to", "Pangyo-dong,", "Bundang-gu,", "Seongnam-si", "with My Dream,", "Programmer", "Tour Guide to Pangyo-dong"
]);





