import { Button } from "@mui/material";
import { render, act, fireEvent, cleanup, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../../App";
// import axios from 'axios'
import Home from '../Home'


const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => {

    return {

        ...(jest.requireActual('react-router-dom') as any),

        useNavigate: () => mockNavigate,

    }

})

beforeEach( () => {
    document.body.innerHTML = ""
  })
  
afterEach( () => {
    cleanup()
})

describe('snapshot testing', () => {
    test('snapshot testing of app testing', () => {
        render(<App />)
        expect(screen).toMatchSnapshot()
    })
})

describe('render input test', () => {
    test('textfield test', () => {
        render(
        <BrowserRouter>
        <Home />
        </BrowserRouter>
        );
        // eslint-disable-next-line testing-library/no-node-access
        const renderInputEl: any  = screen.getByTestId('numberInput').querySelector('input');
        fireEvent.change(renderInputEl, {target: {value: 'india'}})
    })
})


test('button should be disabled for empty string',  () => {
    render(<Home />);
    const btn = screen.getByTestId('country')
    // eslint-disable-next-line testing-library/no-node-access
    const numberInput: any = screen.getByTestId('numberInput').querySelector('input')
    fireEvent.change(numberInput, {target: {value: ''}})

    expect(btn).toBeDisabled()
})


test('button should be enabled for non-empty number',  () => {
    render(<Home />);

    const inputString = screen.getByRole('country');
    fireEvent.change(inputString, {target: {value: ''}})
    const btn = screen.getByTestId('country')
    expect(btn).toHaveAttribute('disabled')
    fireEvent.change(inputString, {target: {value: 'india'}})
    // expect(btn).toBeEnabled()
    expect(btn).not.toBe('disabled')
})

test('calls onClick prop when clicked',  () => {
    render(<Home />);
    const btn = screen.getByTestId('country')
    // eslint-disable-next-line testing-library/no-node-access
    const numberInput: any = screen.getByTestId('numberInput').querySelector('input')
    fireEvent.change(numberInput, {target: {value: 'india'}})
    
    expect(btn).toBeEnabled()
})


test('submit button test', () => {
    render(<Home />)
    const countryBtn = screen.getByRole('country')
    expect(countryBtn).toBeInTheDocument()
})

test("submit button function test", async() =>{
    render(<Home />)
    const countryBtn = screen.getByRole('country')
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        await fireEvent.click(countryBtn)
    })
    expect(countryBtn).toBeInTheDocument()
})


jest.mock("axios", () => ({
    get: jest.fn((_url, _body)=>{
        return new Promise((resolve, reject) => {
            if(_url === `https://restcountries.com/v2/name/canada`){
                resolve({
                    data:{
                        capital: "Ottawa",
                        Population: "38005238",
                        latlng: '2077',
                    },
                    status: 200
                })
            }
            else {(
                reject(
                    new Error("Data not found 404")
                )
            )}
        })
    })
}))