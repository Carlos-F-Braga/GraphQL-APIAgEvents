import { StyledCard } from "./styles/Card.styled"


export default function Card ({item: {id, name, title, price, image} }) {
    console.log(image)
    return (
        <StyledCard layout={id % 2 === 0 &&  'row-reverse'}>
            <div> 
                <h2>{title}</h2>
                <p>{name}</p>
                <h4>{price}</h4>
            </div>

            <div> 
                <img src={`./images/${image}`} alt="" />
            </div>
        </StyledCard>
    )
}