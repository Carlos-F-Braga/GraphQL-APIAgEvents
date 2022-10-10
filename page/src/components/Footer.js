import SocialIcons from "./SocialIcons";
import { Container } from "./styles/Container.styled";
import { Flex } from "./styles/Flex.styled";
import { StyledFooter } from "./styles/Footer.styled";


export default function Footer() {
    return (
        <StyledFooter>
            <Container>
            <a href="http://localhost:3000/events" target="_blank" rel="noreferrer"> <img style={{marginTop:"-70px"}} src="./images/aglogo.png" alt="" /> </a>

                <Flex>
          <ul>
            <li>
              Projeto criado por Carlos Frederyco.
              Programando em JavaScript com
              StyledComponents em React.js.
              Utilizando o Visual Studio Code.
            </li>
            <li>+55 (17) 99761-2226</li>
            <li>philadelphoescola@gmail.com</li>
          </ul>
          <ul>
            <li>Sobre Mim</li>
            <li>O Que Eu Faço</li>
            <li>FAQ</li>
          </ul>

          <ul>
            <li>Carreira</li>
            <li>Blog</li>
            <li>Me Contate</li>
          </ul>

          <SocialIcons />
        </Flex>

        <p style={{color:"#000"}}>&copy; 2022 Agvents - The Advance of Events. Todos direitos reservados</p>

            </Container>
        </StyledFooter>
    )
}