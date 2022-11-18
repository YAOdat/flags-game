import React from 'react';
import countries from '../data/countries.json';
import './Quiz.css';
import GameOver from './GameOver.js'


export default class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countryIndex: 0,
            flags: countries.countries[0].flag,
            correctCountry: countries.countries[0].name,
            allCountries: countries.countries[0].name,
            options: [],
            score: 0,
            timer: 0,
            gameOver: false,
            buttonColor: 'red'


        }
    };

    // generate 3 random countries names from the countries.json file
    generateOptions = () => {
        let randomOptions = [];
        // add the correct country to the options
        randomOptions.push(this.state.correctCountry);
        // get 3 random countries that are not the correct country
        while (randomOptions.length < 4) {
            let randomIndex = Math.floor(Math.random() * countries.countries.length);
            let randomCountry = countries.countries[randomIndex].name;
            if (!randomOptions.includes(randomCountry) && randomCountry !== this.state.correctCountry) {
                randomOptions.push(randomCountry);
            }
        }
        // shuffle the options with random indexes
        for (let i = randomOptions.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [randomOptions[i], randomOptions[j]] = [randomOptions[j], randomOptions[i]];
        }

        return randomOptions;
    }

    // handle the click event on the options
    handleClick = (index) => {
        // check if the option clicked is the correct country
        // if score is equal to the length of the countries array, the game is over
        if (this.state.countryIndex !== 25) {
            if (this.state.options[index] === this.state.correctCountry) {
                // update the score
                this.setState({ score: this.state.score + 1 });
                // update the country index
                this.setState({ countryIndex: this.state.countryIndex + 1 });
                // update the flag
                this.setState({ flags: countries.countries[this.state.countryIndex].flag });
                // update the correct country
                this.setState({ correctCountry: countries.countries[this.state.countryIndex].name });
                // update the options
                this.setState({ options: this.generateOptions() });
            } else {
                this.setState({ score: this.state.score - 1 });

                return alert('wrong answer');
            }
        } else {
            this.setState({ gameOver: true });
            // show the timer status when the quiz ended
            alert(`Game Over! Your score is ${this.state.score} and it took you ${this.state.timer} seconds`);

            return alert('game over');
        }
    }

    componentDidMount() {
        this.setState({

            options: this.generateOptions()
        })

        this.timer = setInterval(() => {
            // if the game is over stop the timer
            if (this.state.gameOver) {
                clearInterval(this.timer);
            } else {
            this.setState({ timer: this.state.timer + 1 });
            }
        }, 1000);
    }

    // to ensure that all components are rendered before the new options are generated use ComponentDidUpdate
    componentDidUpdate(prevProps, prevState) {
        if (prevState.countryIndex !== this.state.countryIndex) {
            this.setState({
                options: this.generateOptions()
            })
        }

    }

    render() {
        return (
            <div className="quiz">
                <div className="quiz__score">Score: {this.state.score}</div>
                {/* if the game is not over, show the quiz */}
                {!this.state.gameOver &&
                    <div className="quiz__container">
                        <div className="quiz__timer">Timer: {this.state.timer}</div>
                        <div className="quiz__question">
                            <div className='flag-contianr'>
                                <div className="flag">
                                    <img src={this.state.flags} alt="flag" />
                                </div>
                            </div>

                            <h2>Which country does this flag belong to?</h2>
                            {/* render the options: */}
                            <div className="quiz__options">
                                {this.state.options.map((option, index) => {
                                    return (
                                        <button className="quiz__option" key={index} onClick={() => this.handleClick(index)}>
                                            
                                            {option}

                                        </button>
                                    )
                                })}


                            </div>
                        </div>


                    </div>
                }
                {/* if the game is over, show the game over component */}
                {this.state.gameOver && <GameOver score={this.state.score} timer={this.state.timer} />}
            </div>


        )



    }
}



