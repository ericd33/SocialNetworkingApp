import PostEvent from "./PostEvent";
import image from '../../resources/imagen.jpg';
import { Container } from "@mui/material";

export default function EventList() {
    return (
        <Container>
            <PostEvent date='10/10/2022' hour='21' location='Santiago del Estero' title='Encuentro Gamer' text='La Electronic Entertainment Expo, más conocida por su abreviatura E3, es la convención de videojuegos más importante de la industria, en la que diversas compañías de videojuegos hablan de sus próximos lanzamientos, y algunas veces de su software y hardware.' image={image}/>
            <br/>
            <PostEvent date='10/10/2022' hour='21' location='Santiago del Estero' title='Encuentro Gamer' text='La Electronic Entertainment Expo, más conocida por su abreviatura E3, es la convención de videojuegos más importante de la industria, en la que diversas compañías de videojuegos hablan de sus próximos lanzamientos, y algunas veces de su software y hardware.' image={image}/>
            <br/>
            <PostEvent date='10/10/2022' hour='21' location='Santiago del Estero' title='Encuentro Gamer' text='La Electronic Entertainment Expo, más conocida por su abreviatura E3, es la convención de videojuegos más importante de la industria, en la que diversas compañías de videojuegos hablan de sus próximos lanzamientos, y algunas veces de su software y hardware.' image={image}/>
            <br/>
            <PostEvent date='10/10/2022' hour='21' location='Santiago del Estero' title='Encuentro Gamer' text='La Electronic Entertainment Expo, más conocida por su abreviatura E3, es la convención de videojuegos más importante de la industria, en la que diversas compañías de videojuegos hablan de sus próximos lanzamientos, y algunas veces de su software y hardware.' image={image}/>
            <br/>
            <PostEvent date='10/10/2022' hour='21' location='Santiago del Estero' title='Encuentro Gamer' text='La Electronic Entertainment Expo, más conocida por su abreviatura E3, es la convención de videojuegos más importante de la industria, en la que diversas compañías de videojuegos hablan de sus próximos lanzamientos, y algunas veces de su software y hardware.' image={image}/>
            <br/>
        </Container>
    )
}