// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css'

import {
  Box,
  Button,
  Container,
  Group,
  Image,
  MultiSelect,
  TextInput,
  Title
} from '@mantine/core'
import { getRandomImageUrl } from './foto'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GetImages } from './services'

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

export default function Home() {
  const [Value, setvalue] = useState<string[]>([])
  const [search, setsearch] = useState<string>('')
  const [images, setimages] = useState<any[]>([])
  useEffect(() => {
    GetImages().then((res) => {
      setimages(res)
    })
  }, [])
  return (
    <Container>
      <Title ta="center" order={1} mt={20}>
        MoodBoard
      </Title>
      <Group mt={20} justify="center" style={{ marginBottom: '2rem' }}>
        <TextInput
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          placeholder="Search.."
        />
        <MultiSelect
          value={Value}
          onChange={(Value) => setvalue(Value)}
          placeholder="Select"
          data={['Animals', 'Flowers', 'Places', 'Food']}
        />
        <Button variant="outline" component={Link} to="/upload">
          Upload Image
        </Button>
      </Group>
      <Box style={{ columns: '18rem', gap: '1rem' }}>
        {images
          .filter((item) => item.title.includes(search))
          .filter((item) =>
            Value.length === 0
              ? true
              : Value.some((val) => item.tags.includes(val.toLowerCase()))
          )
          .map((item) => (
            <Link to={`/${item.id}`}>
              <Image
                style={{ borderRadius: '1rem' }}
                mb={20}
                src={item.url}
                alt="Random image"
              />
            </Link>
          ))}
      </Box>
    </Container>
  )
}
