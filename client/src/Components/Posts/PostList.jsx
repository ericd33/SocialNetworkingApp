import { Container } from "@mui/system";
import Post from "./Post";
import perfil from '../../resources/perfil.jpg'
import image from '../../resources/imagen.jpg'

export default function PostList() {
    return (
        <Container>
            <br/>
            <Post name={'Patricio Pereyra Gargiulo'} photoperfil={perfil} text={'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'}/>
            <br/>
            <Post name={'Patricia Mariel Gargiulo'} text={'Lizards are a widespread with over 6,000 species, ranging across all continents except Antarctica'} image={image}/>
        </Container>
    )
}