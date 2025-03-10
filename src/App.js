import './App.css';
import { useState } from 'react';

export default function App()
{
  return (

    <TipCalculator />
  );
}
function TopTitel()
{
  return <h1 className='header'>Tip calculator</h1>
}
function TipCalculator()
{

  const [bill, setBill] = useState('');
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  const [numPeople, setNumPeople] = useState(1);
  const tip = Math.trunc(bill * ((percentage1 + percentage2) / 2 / 100));




  function handleReset()
  {
    setBill('');
    setPercentage1(0);
    setPercentage2(0);
    setNumPeople(1);
  }
  function handleAddPeople()
  {
    setNumPeople(numPeople + 1);

  }
  function handleMencPeople()
  {
    numPeople > 1 ? setNumPeople(numPeople - 1) : setNumPeople('');

  }

  return <>
    <TopTitel />
    <div className='minApp'>
      <div className='inputsApp'>

        <BillInput bill={bill} onSetPill={setBill} />


        <SelectPercentage
          percentage={percentage1}
          onSelect={setPercentage1}>
          How did you like the service?
        </SelectPercentage>

        <SelectPercentage
          percentage={percentage2}
          onSelect={setPercentage2}>
          How did your frind like the service?
        </SelectPercentage>


        <SelectPeople numPeople={numPeople}
          onAddPeople={handleAddPeople}
          onMencPeople={handleMencPeople}
          onSetNumPeople={setNumPeople}
          bill={bill}
          tip={tip}
        />

      </div>
      <div className='outputsApp'>
        {/* {bill > 0 && <div> <Outout bill={bill} tip={tip} />
      <Reset onRest={handleReset} /></div>} */}
        <Outout bill={bill} tip={tip} numPeople={numPeople} />
        <Reset onRest={handleReset} />

      </div>

    </div></>
}

function BillInput({ bill, onSetPill })
{
  return <div>

    <label>How Much Was the Bill?</label>
    <input type="number"
      placeholder="Bill Value"
      value={bill}
      onChange={e => Number(onSetPill(e.target.value))} />

  </div>
}

function SelectPercentage({ onSelect, percentage, children })
{
  return <div>
    <label>{children}</label>
    <select value={percentage} onChange={e => onSelect(Number(e.target.value))}>
      <option value='0'>Dissatisfiend (0%)</option>
      <option value='5'>It Was Okay (5%)</option>
      <option value='10'>It Was Good (10%)</option>
      <option value='20'>Absolutely Amazing! (20%)</option>

    </select>

  </div >
}

function Outout({ bill, tip, numPeople })
{
  bill = bill === '' ? 0 : bill;

  return <div className='invoice'>
    <div className='informReset'>
      <div className='number'>${tip}</div>
      <div className='text'>
        <span className='pig'>Tip</span><br />
        <span className='smol'>All Tip</span>
      </div>
    </div>

    <div className='informReset'>
      <div className='number'>${bill}</div>
      <div className='text'>

        <span className='pig'>Bill</span><br />
        <span className='smol'>All Bill</span>
      </div>
    </div>

    <div className='informReset'>
      <div className='number'>${Math.trunc((Number(bill) + tip) / numPeople)}</div>
      <div className='text'>
        <span className='pig'>Bill</span><br />
        <span className='smol'>per persone</span>
      </div>
    </div>
    <div className='informReset'>
      <div className='number'>${Number(bill) + tip}</div>
      <div className='text'>
        <span className='pig'>Total</span><br />
        <span className='smol'>Total Bill</span>
      </div>
    </div>
  </div>
}

function Reset({ onRest })
{
  return <button onClick={onRest}>Reset</button>
}

function SelectPeople({ onSetNumPeople, numPeople, onAddPeople, onMencPeople })
{
  return <div>
    <label>Enter the number of people to split the bill among.</label>

    <div className='countPeople'>

      <button onClick={onAddPeople} ><i class="fa-solid fa-plus"></i></button >

      <input type="number"
        placeholder="Enter The Number"
        onChange={e => onSetNumPeople(Number(e.target.value))}
        value={numPeople}
      />

      <button onClick={onMencPeople}><i class="fa-solid fa-minus"></i></button>
    </div>

  </div >
}