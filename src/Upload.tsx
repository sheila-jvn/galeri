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
import { UploadImage } from './services'
import { useState } from 'react'
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

export default function Upload() {
  const [file, setfile] = useState<File>()
  const [Value, setvalue] = useState<string[]>()
  const [title, settitle] = useState<string>()
  return (
    <Container>
      <Title c='blue' ta="center" order={1} mt={20}>
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
          <Button
            onClick={() => {
              UploadImage(title!, Value!, file!).then(() => {
                notifications.show({
                  title: 'Default notification',
                  message: 'Successfully uploaded',
                })
                setfile(undefined)
                setvalue([])
                settitle('')
              })
            }}>
            Upload
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
