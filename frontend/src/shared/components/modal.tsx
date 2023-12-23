import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import { ModalState } from '../../context/modalState'

const ModalExample = () => {
  const [open, setOpen] = useRecoilState<boolean>(ModalState)
  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
      isCentered
      blockScrollOnMount
      closeOnOverlayClick={false}
      size='xl'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro minus
          dolores debitis. Ullam, cum quia nemo corrupti, doloremque sequi quod
          doloribus molestiae nobis quis ipsam fugit, voluptatem quaerat!
          Molestiae, voluptate.
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalExample
