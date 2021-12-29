const GridView = ({data, viewX, viewY}) => {
    const contains2d=(data,val)=>{
        for (let i=0; i<data.length; i++){
            if (data[i][0]==val[0] && data[i][1]==val[1]){
                return true;
            }
        }
        return false;
    }
    let positions=[];
    for (let y=0; y<viewY; y++){
        for (let x=0; x<viewX; x++){
            positions.push([x,y]);
        }
    }
    let columnString = '';
    for (let i=0; i<viewX; i++){
        columnString = columnString + 'auto ';
    }
    return (
        <div key={columnString} style={{'width':'100%','height':'100%'}}>
            <div key={columnString} style={{'display':'grid','gridTemplateColumns':columnString,'width':'100%','height':'100%'}}>
            {positions.map((pos)=>(
                <div key={pos[0]+20*pos[1]} style={{'backgroundColor':(contains2d(data,pos)?'black':null)}}>˙</div>
            ))}
        </div>
        </div>
    );
};

export default GridView;
