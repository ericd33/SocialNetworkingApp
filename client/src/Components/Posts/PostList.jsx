import { Container } from "@mui/system";
import Post from "./Post";

export default function PostList() {
    return (
        <Container>
            <br/>
            <Post name={'Patricio Pereyra Gargiulo'} text={'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'}/>
            <br/>
            <Post name={'Patricia Mariel Gargiulo'} text={'Lizards are a widespread with over 6,000 species, ranging across all continents except Antarctica'}/>
        </Container>
    )
}