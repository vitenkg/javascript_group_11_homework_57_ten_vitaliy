import React, {useState} from 'react';
import './Calculator.css';


const Calculator = () => {
    const [mode, setMode] = useState('split');

    const [people, setPeople] = useState([]);

    const [split, setSplit] = useState({
        peoples: undefined,
        sum: undefined,
        per: 15,
        delivery: undefined,
    });

    const [individual, setIndividual] = useState({
        per: 15,
        delivery: undefined,
    });

    const [totalSplit, setTotalSplit] = useState({
        totalPrice: 0,
        quantity: 0,
        each: 0,
    });

    const [totalIndividual,setTotalIndividual] = useState([]);

    const [showCheck, setShowCheck] = useState(false);

    const onRadioChange = e => {
        setMode(e.target.value);
    };

    const addPerson = () => {
        setPeople(people => [...people, {name: '', price: '', id: Math.random()}])
    };

    const changePersonFields = (id, name, value) => {
        setPeople(people => {
            return people.map(person => {
                if (person.id === id) {
                    return {...person, [name]: value}
                }

                return person;
            })
        })
    };

    const removePersonFields = id => (
        setPeople(people.filter(p => p.id !== id))
    );

    const onChangeInputs = e => {
        const {name, value} = e.target;
        setSplit(prev => ({
            ...prev,
            [name]: value
        }))
    };

    let calcSplit = null;

    if (showCheck) {
        calcSplit = (
            <div>
                <div>Общая сумма: {totalSplit.totalPrice} сом</div>
                <div>Кол-во человек: {totalSplit.quantity}</div>
                <div>Каждый оплачивает: {totalSplit.each} сом</div>
            </div>
        );
    }

    const calculationSplit = e => {
        e.preventDefault();
        let delivery = 0;
        if (split.delivery === undefined) {
            delivery = 0
        } else {
            delivery = split.delivery
        }
        setTotalSplit(prev => ({
            ...prev,
            totalPrice: (split.sum * (split.per / 100)) + split.sum,
            quantity: split.peoples,
            each: Math.ceil((((split.sum * (split.per / 100)) + split.sum) / split.peoples) + (delivery / split.peoples)),
        }));
        setShowCheck(true);
    };

    const calculationIndividual = e => {
        e.preventDefault();
        let delivery = 0;
        if (individual.delivery === undefined) {
            delivery = 0;
        } else {
            delivery = individual.delivery / people.length
        }
        console.log(delivery);
        setTotalIndividual(people.map(p => {
            return {
                ...totalIndividual,
                name: p.name,
                totalPrice: p.price + (p.price * (individual.per / 100)) + delivery,

            }
        }))

    };

    const onChangeInputsInd = e => {
        const {name, value} = e.target;
        setIndividual(prev => ({
            ...prev,
            [name]: parseInt(value)
        }))
    };

    return (
        <div>
            <p>
                <label>
                    <input
                        type="radio"
                        checked={mode === 'split'}
                        name="mode"
                        value="split"
                        onChange={onRadioChange}
                    />{' '}
                    Поровну между участниками
                </label>
            </p>
            <p>
                <label>
                    <input
                        type="radio"
                        checked={mode === 'individual'}
                        name="mode"
                        value="individual"
                        onChange={onRadioChange}
                    /> {' '}
                    Поровну между участниками
                </label>
            </p>

            <div>
                {mode === 'split' ? (
                    <form className="Form" onSubmit={calculationSplit}>
                        <label className="Split">
                            Человек{' '}
                            <input
                                className="SplitInput"
                                type="number"
                                name="peoples"
                                value={split.peoples}
                                onChange={onChangeInputs}
                            />
                            чел.
                        </label>
                        <label className="Split">
                            Сумма заказа{' '}
                            <input
                                className="SplitInput"
                                type="number"
                                name="sum"
                                value={split.sum}
                                onChange={onChangeInputs}
                            />
                            сом
                        </label>
                        <label className="Split">
                            Обслуживание{' '}
                            <input
                                className="SplitInput"
                                type="number"
                                name="per"
                                value={split.per}
                                onChange={onChangeInputs}
                            />
                            %
                        </label>
                        <label className="Split">
                            Доставка{' '}
                            <input
                                className="SplitInput"
                                type="number"
                                name="delivery"
                                value={split.delivery}
                                onChange={onChangeInputs}
                            />
                            сом
                        </label>
                        <p>
                            <button
                                type="submit"
                            >
                                Расчитать
                            </button>
                        </p>
                        {calcSplit}

                    </form>
                ) : (
                    <form onSubmit={calculationIndividual}>
                        <h4>Individual</h4>
                        <p>
                            <button type="button" onClick={addPerson}>Add person</button>
                        </p>
                        {people.map(person => (
                            <div key={person.id}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={person.name}
                                    onChange={e => changePersonFields(person.id, 'name', e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Total"
                                    value={person.price}
                                    onChange={e => changePersonFields(person.id, 'price', parseInt(e.target.value))}
                                />
                                <button
                                    type="button"
                                    onClick={() => removePersonFields(person.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <label className="Split">
                            Обслуживание{' '}
                            <input
                                className="SplitInput"
                                type="number"
                                name="per"
                                value={individual.per}
                                onChange={onChangeInputsInd}
                            />
                            %
                        </label>
                        <label className="Split">
                            Доставка{' '}
                            <input
                                className="SplitInput"
                                type="number"
                                name="delivery"
                                value={individual.delivery}
                                onChange={onChangeInputsInd}
                            />
                            сом
                        </label>
                        <button
                            type="submit"
                        >
                            Рассчитать
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Calculator;