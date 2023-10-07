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
import { GetImages, GetTags } from './services'
import classes from './Home.module.css'

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
  const [tags, setTags] = useState([])
  useEffect(() => {
    GetImages().then((res) => {
      setimages(res)
    })
    GetTags().then((res) => {
      setTags(res.value)
    })
  }, [])
  return (
    <Container>
      <Title c='blue' ta="center" order={1} mt={20}>
        Mood Board
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
          data={tags}
        />
        <Button variant="outline" component={Link} to="/upload">
          Upload Image
        </Button>
      </Group>
      <Box style={{ columns: '18rem', gap: '1rem' }}>
        {images
          .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
          .filter((item) =>
            Value.length === 0
              ? true
              : Value.some((val) => item.tags.includes(val))
          )
          .map((item) => (
            <Link to={`/${item.id}`}>
              <Image
                classNames={{root: classes.image}}
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
