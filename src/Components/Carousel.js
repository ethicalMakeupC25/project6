import React, { Component } from 'react';
import Coverflow from "react-coverflow";

class Carousel extends Component {
    constructor() {
        super()

        this.state = {
            randomVeganArray: [],
        }
    }

    componentDidMount() {
        const veganArrayCopy = [...this.props.allItemsArray]
        const randomFive = []

        for (let i = 0; i < 5; i++) {
            let randomNum = Math.floor(Math.random() * veganArrayCopy.length)
            randomFive.push(veganArrayCopy[randomNum])
            veganArrayCopy.splice(randomNum, 1)
        }

        this.setState({
            randomVeganArray: randomFive
        })
    }


    render() {
        return (
            <Coverflow
                width={960}
                height={450}
                displayQuantityOfSide={2}
                enableScroll={true}
                clickable={true}
                active={0}
            >
                {
                    this.state.randomVeganArray.map((eachItem) => {
                        return (
                            <img key={eachItem.id}
                                src={eachItem.image_link}
                                alt={eachItem.name}
                                data-action={eachItem.product_link}
                                style={{ display: 'block', width: '100%' }}
                            />
                        )
                    })
                }

            </Coverflow>
        )
    }
}

export default Carousel;