import React, {useState} from 'react';
import './App.css';


interface Param {
    id: number
    name: string
}

interface ParamValue {
    paramId: number
    value: string
}

interface Model {
    paramValues: ParamValue[]
}

export const App = () => {
    const params = [
        {id: 1, name: 'Назначение'},
        {id: 2, name: 'Длина'},
        {id: 3, name: 'Вес'},
        {id: 4, name: 'Цена'},
    ]

    const model = {
        paramValues: [
            {paramId: 1, value: 'повседневное'},
            {paramId: 2, value: 'макси'}
        ]
    }
    return (
        <div className="App">
            <ParamEditor model={model} params={params}/>
        </div>
    );
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

    const handleSelectedValue = (event: React.ChangeEvent<{ value: string }>): void => {
        const paramValues = item.paramValues
        paramValues.push({paramId: paramValues.length + 1, value: event.target.value})
        setItem(prevState => ({...prevState, paramValues: paramValues}))
    }

    return (
        <div>
            <select onChange={(event) => handleSelectedValue(event)}>
                {params.map(item =>
                    <option key={item.id} value={item.name}>{item.name}</option>
                )}
            </select>
            <button onClick={getModel}>Показать модель</button>
        </div>
    )
}