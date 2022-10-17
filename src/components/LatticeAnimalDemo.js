import React from 'react';
import LatticeAnimalView from './LatticeAnimalView.js';
import NumberInput from 'semantic-ui-react-numberinput';
// https://www.sciencedirect.com/science/article/pii/S0012365X81800155
const LatticeAnimalDemo = () => {
    const [mode, setMode] = React.useState('fixed');
    const [numberInputValue, setNumberInputValue] = React.useState('5');

    const genAnimals = (pmode, size) => {
        let fixed=genFixed([[0,0]],size,[],[]);
        if (pmode == 'fixed'){
            return fixed;
        }
        let normalized =[];
        for (let i=0; i<fixed.length; i++){
            normalized.push(normShiftAnimal(fixed[i]));
        }
        
        let rotationSet = [];
        for (let i=0; i<normalized.length; i++){
            if (!rotationalContains(rotationSet, normalized[i])){
                rotationSet.push(normalized[i]);
            }
        }
        if (pmode == 'one-sided'){
            return rotationSet;
        }
        let rotRefSet = [];
        for (let i=0; i<rotationSet.length; i++){
            if (!reflectionalContains(rotRefSet, rotationSet[i])){
                rotRefSet.push(rotationSet[i]);
            }
        }
        // free!
        return rotRefSet;
    }; 
    const rotationalContains = (animals, newAnimal) => {
        for (let i=0; i<animals.length; i++){
            let oldAnimal = animals[i];
            if (animalEquals(oldAnimal, newAnimal)) return true;
            oldAnimal = rotateAnimal(oldAnimal);
            if (animalEquals(oldAnimal, newAnimal)) return true;
            oldAnimal = rotateAnimal(oldAnimal);
            if (animalEquals(oldAnimal, newAnimal)) return true;
            oldAnimal = rotateAnimal(oldAnimal);
            if (animalEquals(oldAnimal, newAnimal)) return true;
        }
        return false;
    };
    const reflectionalContains = (animals, newAnimal) => {
        for (let i=0; i<animals.length; i++){
            let oldAnimal = animals[i];
            if (animalEquals([oldAnimal], newAnimal)) return true;
            let oldHor = reflectAnimal(oldAnimal, "h");
            if (rotationalContains([oldHor], newAnimal)) return true;
            let oldVert = reflectAnimal(oldAnimal, "v");
            if (rotationalContains([oldVert], newAnimal)) return true;
        }

        return false;
    };
    const animalEquals = (animal, animal2) => {
        if (animal.length != animal2.length){
            return false;
        }
        for (let i=0; i<animal.length; i++){
            let pos = animal[i];
            if (!contains2d(animal2, pos)){
                return false;
            }
        }
        return true;
    };
    const rotateAnimal = (animal) => {
        let newAnimal = [];
        for (let i=0; i<animal.length; i++){
            newAnimal.push([-1*animal[i][1], animal[i][0]]);
        }
        return normShiftAnimal(newAnimal);
    }
    const reflectAnimal = (animal, mode) => {
        let newAnimal = [];
        for (let i=0; i<animal.length; i++){
            newAnimal.push([
            ((mode=="h" || mode=="d")?-1:1)*animal[i][0],
            ((mode=="v" || mode=="d")?-1:1)*animal[i][1]
        ]);
        }
        return normShiftAnimal(newAnimal);

    };
    const normShiftAnimal = (animal) => {
        let minX = 1000;
        let minY = 1000;
        let newAnimal = [];
        for (let i=0; i<animal.length; i++){
            let pos = animal[i];
            minX = (pos[0]<minX)?pos[0]:minX;
            minY = (pos[1]<minY)?pos[1]:minY;
        }
        for (let i=0; i<animal.length; i++){
            newAnimal.push([animal[i][0]-minX, animal[i][1]-minY]);
        }
        return newAnimal;
    };
    const contains2d=(data,val)=>{
        for (let i=0; i<data.length; i++){
            if (data[i][0]==val[0] && data[i][1]==val[1]){
                return true;
            }
        }
        return false;
    }
    const genFixed = (untried, n,p,pneighbors)=>{
        let r =[];
        while (untried.length>0){
            let u = untried.shift();
            let pcopy = [];
            pcopy.push(...p);
            p.push(u);
            if(p.length==n){
                let pcopy2 = [];
                pcopy2.push(...p);
                r.push(pcopy2);
            }else{
                let possibleNewNeighbors = [
                    [1+u[0], 0+u[1]],
                    [(-1)+u[0], 0+u[1]],
                    [0+u[0], 1+u[1]],
                    [0+u[0], (-1)+u[1]]
                ];
                let newNeighbors = [];

                for (let i=0; i<4; i++){
                    let nn = possibleNewNeighbors[i];
                    if ((nn[1]>0 ||(nn[1]==0 && nn[0]>=0)) &&
                        (!contains2d(untried,nn)) &&
                        (!contains2d(p,nn)) &&
                        (!contains2d(pneighbors,nn))){
                        newNeighbors.push(nn);
                    }
                }
                let newUntried=[];
                newUntried.push(...untried, ...newNeighbors);
                let newpNeighbors=[];
                newpNeighbors.push(...pneighbors,...newNeighbors);
                r.push(...genFixed(newUntried, n, p, newpNeighbors));
            }
            p = pcopy;
        }
        return r;
    }


    const onModeChange= (newMode) => {
        setMode(newMode);
    }
    const [index, setIndex] = React.useState(0);
    const [animalSize, setAnimalSize] = React.useState(5);
    const [animals, setAnimals] = React.useState([[[0,0]]]);
    const decSize = () => {
        setAnimalSize(animalSize=> animalSize>1?animalSize-1:1);
    };
    const incSize = () => {
        setAnimalSize(animalSize=> animalSize<7?animalSize+1:8);
    };
    const updateAnimalSize= (newValue) => {
        let newValueN = Number(newValue);
        if (newValueN>1 && newValueN <7){
            setAnimalSize(newValueN);
        }
        console.log(newValue);
    }

    const updateIndex = () => {
        setIndex(index=>(index+1)%animals.length);
    };

    React.useEffect(() => {
        setIndex(0);
        let base=[[0,0],[0,1],[1,1],[2,1]];
        let anim = [normShiftAnimal(base), reflectAnimal(reflectAnimal(base,"h"),"d")];
        let locAnimals = genAnimals(mode, animalSize);
        setAnimals(locAnimals);
        const interval = setInterval(()=>{setIndex(index=>(index+1)%locAnimals.length);}, 500);
        return () => clearInterval(interval);
    }, [animalSize,mode]);
    //let animals = genAnimals(mode, animalSize);
    return (
        <div>
        <div className="fullViewer">
        <div className="displayer">
            <LatticeAnimalView animals={animals} index={index} viewX={animalSize+1} viewY={animalSize+1}/>
            </div>
            <div className="settings">
            <p>Current size:</p>
            <div className="incThing">
                <button onClick={decSize}>-</button>
                <p>{animalSize}</p>
                <button onClick={incSize}>+</button>
            </div>
            <p>Set lattice animal type:</p>
            <div className="typeSelector"> 
            <label className="container"> Free (rotation+reflection invariant)
                <input type="radio" checked={mode == 'free'} onChange={()=>onModeChange('free')}/>
                <span className="checkmark"></span>
            </label>
            <label className="container"> One-Sided (rotation invariant)
                <input type="radio" checked={mode == 'one-sided'} onChange={()=>onModeChange('one-sided')}/>
                <span className="checkmark"></span>
            </label>
            <label className="container"> Fixed
                <input type="radio" checked={mode == 'fixed'} onChange={()=>onModeChange('fixed')}/>
                <span className="checkmark"></span>
            </label>
                </div>
                </div>
            </div>
            <p>{index} / {animals.length}</p>
            <p>Number of lattice animals of this size: {animals.length}</p>
        </div>
    );

};

export default LatticeAnimalDemo;
