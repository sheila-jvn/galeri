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
import { CreateTag, EditImage, GetImage, GetTags } from './services'
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
  const [tags, setTags] = useState([])
  const [addtag, setAddTag] = useState('')
  useEffect(() => {
    GetImage(id!).then((res) => {
      settitle(res.title)
      setvalue(res.tags)
      setdata(res)
    })
    GetTags().then((res) => {
      setTags(res.value)
    })
  }, [id])

  return (
    <Container>
      <Title c="blue" ta="center" order={1} mt={20}>
        Edit Image
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
            label="Select your tags">
            <Stack mt="xs">
              {tags.map((item) => (
                <Checkbox key={item} value={item} label={item} />
              ))}
            </Stack>
          </CheckboxGroup>
          <Group>
            <TextInput
              value={addtag}
              onChange={(e) => setAddTag(e.target.value)}
              w={'82%'}
              placeholder="Add New Tag"
            />
            <Button
              onClick={() => {
                CreateTag(addtag).then((res) => {
                  setAddTag('')
                  setTags(res)
                  notifications.show({
                    title: 'Default notification',
                    message: 'Successfully added'
                  })
                })
              }}>
              Add
            </Button>
          </Group>
          <Button
            onClick={() => {
              EditImage(id, title, Value).then(() => {
                notifications.show({
                  title: 'Default notification',
                  message: 'Successfully Edited'
                })
                navigate('/')
              })
            }}>
            Save
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
