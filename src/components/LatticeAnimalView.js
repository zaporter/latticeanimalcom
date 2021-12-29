import GridView from './GridView.js';

const LatticeAnimalView = ({animals, index, viewX, viewY}) =>{
    if (index>=animals.length){
        index=0;
    }
    let animal = animals[index];

    let sumX=0; 
    let sumY=0;
    for (let i=0; i<animal.length; i++){
        let pos = animal[i];
        sumX+=pos[0];
        sumY+=pos[1];
    }
    let comX = sumX/animal.length;
    let comY = sumY/animal.length;
    let offX = (viewX/2)-(comX);
    let offY = (viewY/2)-(comY);

    let shiftedAnimal = [];
    for (let i=0; i<animal.length; i++){
        shiftedAnimal.push([Math.round(animal[i][0]+offX), Math.round(animal[i][1]+offY)]);
    }

    return (
        <div style={{'width':'100%','height':'100%'}}>
            <GridView data={shiftedAnimal} viewX={viewX} viewY={viewY}/>
            </div>
    );

};
export default LatticeAnimalView;
