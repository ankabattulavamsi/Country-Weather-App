import { render, act, fireEvent, cleanup, screen } from "@testing-library/react";
// import axios from 'axios'
import { BrowserRouter} from 'react-router-dom'
import Weather from '../Weather'

const item = {
    capital: 'Ottawa'
}

beforeEach( () => {
    document.body.innerHTML = ""
  })
  
afterEach( () => {
    cleanup()
})

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => {

    return {

        ...(jest.requireActual('react-router-dom') as any),

        useNavigate: () => mockNavigate,

       

    }

})


test('weather button test', () => {
    render(<BrowserRouter>
    <Weather props={item} />
    </BrowserRouter>)
    const countryBtn : any = screen.getByTestId('weatherButton')
    expect(countryBtn).toBeInTheDocument()
})

test("weather button function test", async() =>{
    render(<BrowserRouter>
        <Weather props={item} />
        </BrowserRouter>)

    const countryBtn = screen.getByTestId('weatherButton')

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        await fireEvent.click(countryBtn)
    })
    expect(countryBtn).toBeInTheDocument()
})


describe('Back button test', () => {
    test('back button', () => {
        render(
            <BrowserRouter>
              <Weather props={item} />
            </BrowserRouter>
          );
    const backButton = screen.getByRole('button', {name: 'Back'})  
    expect(backButton.textContent).toBe('Back')
    });

    it("Back button function test", async () => {
        render(
          <BrowserRouter>
            <Weather props={item} />
          </BrowserRouter>
        );
    
        const backBtn = screen.getByTestId("backButton");
    
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
          await fireEvent.click(backBtn);
        });
    
        expect(backBtn).toBeInTheDocument();
      });
})



jest.mock("axios", () => ({
    get: jest.fn((_url, _body)=>{
        return new Promise((resolve, reject) => {
            if(_url === `http://api.weatherstack.com/current?access_key=e3d5c15d4e7a1fba98fc1858e5358e0d&query=new delhi`){
                resolve({
                    data:{
                        Temperature: "40",
                        weather_icons: "",
                        wind_speed: '7',
                        Precip: '0'
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