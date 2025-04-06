import { JSX } from 'react/jsx-runtime'
import { Button } from '../ui/button'
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from '../ui/drawer'

export default function LogPeriodModal({
  isOpen,
  trigger,
  title,
  submitText = 'Submit',
  description,
  onSubmit,
  onCancel,
}: {
  isOpen: boolean
  trigger: JSX.Element
  title: string
  submitText?: string
  description: string
  onSubmit: () => void
  onCancel: () => void
}) {
  return (
    <Drawer open={isOpen}>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button onClick={onSubmit}>{submitText}</Button>
          <DrawerClose>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
