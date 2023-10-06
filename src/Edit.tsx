import {
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Group,
  Image,
  SimpleGrid,
  Stack,
  TextInput,
  Title
} from '@mantine/core'
import { getRandomImageUrl } from './foto'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { EditImage, GetImage } from './services'
import { notifications } from '@mantine/notifications'

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

export default function Edit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [Value, setvalue] = useState<string[]>([])
  const [title, settitle] = useState<string>()
  const [data, setdata] = useState<any>({})
  useEffect(() => {
    GetImage(id!).then((res) => {
      settitle(res.title)
      setvalue(res.tags)
      setdata(res)
    })
  }, [id])
  
  return (
    <Container>
      <Title ta="center" order={1} mt={20}>
        Upload Image
      </Title>
      <SimpleGrid mt={20} cols={2}>
        <Image src={data.url}></Image>
        <Stack>
          <TextInput
            value={title}
            onChange={(e) => settitle(e.target.value)}
            placeholder="Title"
          />
          <CheckboxGroup
            value={Value}
            onChange={(Value) => setvalue(Value)}
            label="Select your favorite frameworks/libraries"
            description="This is anonymous">
            <Stack mt="xs">
              <Checkbox value="animals" label="Animals" />
              <Checkbox value="flowers" label="Flowers" />
              <Checkbox value="places" label="Places" />
              <Checkbox value="food" label="Food" />
            </Stack>
          </CheckboxGroup>
          <Group>
            <TextInput w={'82%'} placeholder="Add New Tag" />
            <Button>Add</Button>
          </Group>
          <Button onClick={() => {
            EditImage(id, title, Value).then(() => {
              notifications.show({
                title: 'Default notification',
                message: 'Successfully Edited',
              })
              navigate('/')
            })
          }}>Save</Button>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
