import React, {useState} from 'react';

const Calculator = () => {
    const [mode, setMode] = useState('split');

    const [people, setPeople] = useState([]);

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
                    <form className="Form">
                        <label>
                            Человек{' '}
                            <input type="text"/>
                        </label>
                    </form>
                ) : (
                    <form>
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
                                <input type="number" placeholder="Total"/>
                                <button
                                    type="button"
                                    onClick={() => removePersonFields(person.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                    </form>
                )}
            </div>
        </div>
    );
};

export default Calculator;