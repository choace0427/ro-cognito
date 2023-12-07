import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Input,
} from "@material-tailwind/react";

export default function Verification() {
  return (
    <Input label="Email" size="lg" />
    // <Card className="w-full max-w-[26rem] shadow-lg">
    //   <CardHeader floated={false} color="blue-gray">
    //   </CardHeader>

    //   <CardFooter className="pt-3">
    //     <Button size="lg" fullWidth={true}>
    //       Reserve
    //     </Button>
    //   </CardFooter>
    // </Card>
  );
}
