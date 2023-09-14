import './App.css'
import {useState, useRef, useEffect} from 'react'

export default function App() {
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const symbol = '!@#$%^&*_?!@#$%^&*_?!@#$%^';
    const number = '12345678901234567890123456'
    
    const [range, setRange] = useState(4)
    const [pass, setPass] = useState('')
    const [upc, setUpc] = useState(false)
    const [lwc, setLwc] = useState(false)
    const [sym, setSym] = useState(false)
    const [numb, setNumb] = useState(false)
    const [cpy, setCpy] = useState(false)
    const [bar, setBar] = useState(0)
    const passBox = useRef()

    let barPercentage = () =>{
        if(bar>=0 && bar<100)        
        setBar(bar+1)
    }

    useEffect(()=>{
       setTimeout(()=>{
        barPercentage()
       },50) 
    },[bar])

    
    let changeRange = (event) =>{
        setRange(+event.target.value)
    }

    let generatePass = () =>{
        let allData = ''
        let a = ''
        
        if(numb){
            allData += number  
        }
        if(upc){
            allData += upperCase  
        }
        if(lwc){
            allData += lowerCase  
        }
        if(sym){
            allData += symbol  
        }
        
        for(let i=0; i<range; i++)
        {
            console.log(range)
            let v = String(Math.floor(Math.random() * allData.length))
            a += allData[v];            
        }
        setPass(a)

        if(!numb && !upc && !lwc && !sym)
        setPass("Click The Checkbox !")
    }

    let clickBox = (event) =>{
        let value = event.target.value
        if(value=='up')
        setUpc(!upc)

         if(value=='lc')
        setLwc(!lwc)

        if(value=='sy')
        setSym(!sym)

        if(value=='num')
        setNumb(!numb)
    }
    
    let copy = () =>{
        
        if(cpy==false){
            setCpy(true)
            setTimeout(()=>{
                setCpy(false)
            },800)
        }

        navigator.clipboard.writeText(pass)
    }
    console.log(cpy)
    return <>
        <h1 className='alert-success text-center'>Password Generator</h1>
        {bar<100?<>
            <div className='progress_main_container'>
        <div style={{width: `${bar}%`}}>
            <div className='progress_bar' style={{color: bar>50?'white':'black'}}>{bar}%</div>
        </div>
        </div>
        <b className='info_tag'>Please Wait Whilte It's Loading !</b>
        </>
        :
        <>
        <div className='main_container mt-5 d-flex justify-content-center'>
            <div>
                <div className='container pb-5'>
                    <div className="row">
                        <div className='col-xl-10 col-lg-10 col-sm-10'>
                            <input type='text' value={pass} disabled ref={passBox} className='form-control bg-dark text-white' />
                        </div>
                        <div className='col-xl-2 col-lg-2 col-sm-2'>
                            {cpy?<><b className='btn btn-success border bg-dark text-white' onClick={copy}>COPIED !</b></>:<><button className='btn btn-success border' onClick={copy} >COPY</button></>}
                            {/* <button className='btn btn-success border' onClick={copy} >COPY</button> */}
                        </div>
                    </div>
                </div>

                <div className='container mt-3'>
                    <div className="row">
                        <div className='col-xl-6 col-lg-6 col-sm-6'>
                            <h2 className='text-white'>Character Length :</h2>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-sm-6'>
                            <h2 className='text-white'>{range}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-xl-10 col-lg-10 col-sm-10'>
                            <input type='range' min='4' max='12' defaultValue='4' onChange={(e)=>changeRange(e)} className='form-range' />
                        </div>
                    </div>
                </div>

                <div className='container mt-4'>
                    <div className="row">
                        <div className='col-xl-6 col-lg-6 col-sm-6'>
                            <input type='checkbox' value='up' onClick={(e)=>clickBox(e)}/> &nbsp;
                            <b><label>Include Uppercase Letters</label></b>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-sm-6'>
                            <input type='checkbox' value='lc' onClick={(e)=>clickBox(e)}/> &nbsp;
                            <b><label>Include Lowercase Letters</label></b>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-xl-6 col-lg-6 col-sm-6'>
                            <input type='checkbox' value='num' onClick={(e)=>clickBox(e)}/> &nbsp;
                            <b><label>Include Numbers</label></b>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-sm-6'>
                            <input type='checkbox' value='sy' onClick={(e)=>clickBox(e)}/> &nbsp;
                            <b><label>Include Symbols</label></b>
                        </div>
                    </div>
                </div>

                <div className='container mt-5'>
                    <div className="row">
                        <div className='col-xl-6 col-lg-6 col-sm-6'>
                            <b>Strength :</b>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-sm-6 text-right'>
                            <b>{range>=10?"Very Strong":<>{range>=7?"Strong":"Poor"}</>}</b>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <button className='btn btn-success col-xl-12 col-lg-12 col-sm-12 border' onClick={generatePass}>GENERATE PASSWORD</button>
                    </div >
                </div >
            </div>
        </div>
        </>}
    </>
}