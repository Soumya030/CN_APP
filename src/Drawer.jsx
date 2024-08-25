import React, { useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Text,
  VStack,
  Checkbox,
  Heading,
  Flex,
  Box,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useWidgetContext } from './Context';

export default function DrawerExample({ children, data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { selectedWidgets, updateSelectedWidgets } = useWidgetContext();
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleCheckboxChange = (categoryIndex, widgetIndex) => {
    const isSelected = !selectedWidgets[categoryIndex]?.[widgetIndex];
    updateSelectedWidgets(categoryIndex, widgetIndex, isSelected);
  };

  if (!data || !data[selectedCategory]) {
    return null;
  }

  return (
    <>
      <span ref={btnRef} colorScheme='teal' onClick={onOpen}>
        {children}
      </span>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent maxWidth="600px">
          <DrawerCloseButton />
          <DrawerHeader>
            <Text>Add Widget</Text>
            <Text fontSize="sm">Personalize your dashboard by adding your widget</Text>
          </DrawerHeader>

          <DrawerBody>
            <Flex mb={4}>
              {data.map((category, index) => (
                <Box
                  key={index}
                  px={4}
                  py={2}
                  cursor="pointer"
                  color={selectedCategory === index ? "blue.500" : "black"}
                  onClick={() => setSelectedCategory(index)}
                  mr={2}
                  fontWeight={selectedCategory === index ? "bold" : "normal"}
                  borderBottom={selectedCategory === index ? "2px solid" : "none"}
                  borderColor="blue.500"
                >
                  {category.category}
                </Box>
              ))}
            </Flex>
            <VStack align="stretch" spacing={3}>
              <Heading size="md">{data[selectedCategory].category}</Heading>
              {data[selectedCategory].widgets.map((widget, widgetIndex) => (
                <Box key={widgetIndex}>
                  <Checkbox 
                    isChecked={selectedWidgets[selectedCategory]?.[widgetIndex] || false}
                    onChange={() => handleCheckboxChange(selectedCategory, widgetIndex)}
                  >
                    {widget.title} 
                  </Checkbox>
                </Box>
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={onClose}>Confirm</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
