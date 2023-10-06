import {
  Button,
  Container,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title
} from '@mantine/core'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getRandomImageUrl } from './foto'
import { useEffect, useState } from 'react'
import { DeleteImage, GetImage } from './services'

const array = [
  getRandomImageUrl(),
  getRandomImageUrl(),
  getRandomImageUrl(),
  getRandomImageUrl(),
  getRandomImageUrl(),
  getRandomImageUrl(),
  getRandomImageUrl(),
  getRandomImageUrl(),
  getRandomImageUrl(),
  getRandomImageUrl()
]

export default function View() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setdata] = useState<any>({})
  useEffect(() => {
    GetImage(id!).then((res) => {
      setdata(res)
    })
  }, [id])
  return (
    <Container>
      <Title c='blue' ta="center" order={1} mt={20}>Image Details</Title>
      <SimpleGrid mt={20} cols={2}>
        <Image src={data.url}></Image>
        <Stack>
          <Text>{data.title}</Text>
          <Text>Tags :</Text>
          {data.tags?.map((item) => (
            <Text> - {item}</Text>
          ))}
          <Group>
            <Button component={Link} to={`/${id}/edit/`}>Edit</Button>
            <Button onClick={() => {
              DeleteImage(id!).then(() => {
                navigate('/')
              })
            }}>Delete</Button>
          </Group>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
