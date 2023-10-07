import {
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { getRandomImageUrl } from './foto'
import { CreateTag, GetTags, UploadImage } from './services'
import { useEffect, useState } from 'react'
import { notifications } from '@mantine/notifications'
import { Link, useNavigate } from 'react-router-dom'

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

export default function Upload() {
  const navigate = useNavigate()
  const [file, setfile] = useState<File>()
  const [Value, setvalue] = useState<string[]>([])
  const [title, settitle] = useState<string>('')
  const [loading, setloading] = useState(false)
  const [tags, setTags] = useState([])
  const [addtag, setAddTag] = useState('')
  useEffect(() => {
    GetTags().then((res) => {
      setTags(res.value)
    })
  }, [])
  console.log(tags)
  return (
    <Container>
      <Title c="blue" ta="center" order={1} mt={20}>
        Upload Image
      </Title>
      <SimpleGrid mt={20} cols={2}>
        <Dropzone
          style={{
            borderRadius: '10px',
            borderColor: 'lightgray',
            borderWidth: '2px',
            borderStyle: 'solid'
          }}
          onDrop={(files) => setfile(files[0])}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}>
          {!file && (
            <Group
              justify="center"
              gap="xl"
              mih={220}
              style={{ pointerEvents: 'none' }}>
              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </Group>
          )}
          {file && (
            <Image
              src={file ? URL.createObjectURL(file) : ''}
              alt="Random image"
            />
          )}
        </Dropzone>
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
            loading={loading}
            onClick={() => {
              setloading(true)
              UploadImage(title!, Value!, file!).then(() => {
                notifications.show({
                  title: 'Default notification',
                  message: 'Successfully uploaded'
                })
                setfile(undefined)
                setvalue([])
                settitle('')
                setloading(false)
                navigate('/')
              })
            }}>
            Upload
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
