import React, {useState} from 'react';
import './App.css';


export const App = () => {
    const params = [
        {id: 1, name: 'Назначение', type: ParamType.string},
        {id: 2, name: 'Длина', type: ParamType.number},
        {id: 3, name: 'Качество', type: ParamType.select},
    ]

    const model = {
        paramValues: [
            {paramId: 1, value: 'повседневное'},
            {paramId: 2, value: '9'},
            {paramId: 3, value: 'Среднее'},
        ]
    }

    return (
        <div className="App">
            <ParamEditor model={model} params={params}/>
        </div>
    );
}

enum ParamType {
    string = 'string',
    number = 'number',
    select = 'select'
}

interface Param {
    id: number
    name: string
    type: ParamType
}

interface ParamValue {
    paramId: number
    value: string
}

interface Model {
    paramValues: ParamValue[]
}

interface Props {
    params: Param[]
    model: Model
}

const ParamEditor: React.FC<Props> = ({params, model}) => {
    const [item, setItem] = useState(model)
    const getModel = () => {
        console.log(item)
    }

    const changeParamArea = (value: string, id: number) => {
        const paramValues = item.paramValues
        paramValues[id] = {paramId: item.paramValues.length, value: value}
        setItem(prevState =>
            ({...prevState, paramValues: paramValues}))
    }

    return (
        <div style={{width: "300px"}}>
            {params.map((item, index) =>
                <div key={item.id} style={{display: "flex", padding: '2px'}}>
                    <div style={{paddingRight: "5px", fontWeight: 700, width: '94px'}}>
                        {item.name}
                    </div>
                    {item.type === ParamType.string && (
                        <input
                            type='text'
                            value={model.paramValues[index].value}
                            onChange={(event) => changeParamArea(event.target.value, index)}/>
                    )}
                    {item.type === ParamType.number && (
                        <input
                            type='number'
                            value={model.paramValues[index].value}
                            onChange={(event) => changeParamArea(event.target.value, index)}/>
                    )}
                    {item.type === ParamType.select && (
                        <select onChange={(event) => changeParamArea(event.target.value, index)}>
                            {['Высшее', 'Среднее', 'Низкое'].map((item, index) =>
                                <option key={index} value={item}>{item}</option>
                            )}
                        </select>
                    )}
                </div>
            )}
            <button onClick={getModel}>Показать модель</button>
        </div>
    )
}