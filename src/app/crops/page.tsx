import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PlusCircle } from "lucide-react";

const crops = [
  { name: "Wheat", acres: 150, status: "Growing", plantingDate: "2024-03-15" },
  { name: "Corn", acres: 100, status: "Harvested", plantingDate: "2024-04-01" },
  { name: "Soybeans", acres: 80, status: "Growing", plantingDate: "2024-05-10" },
  { name: "Potatoes", acres: 30, status: "Planting", plantingDate: "2024-06-01" },
  { name: "Barley", acres: 75, status: "Harvested", plantingDate: "2024-03-20" },
];

const statusColors: { [key: string]: string } = {
  Growing: "bg-green-500",
  Harvested: "bg-yellow-500",
  Planting: "bg-blue-500",
};

export default function CropsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">My Crops</h1>
          <p className="text-muted-foreground">Manage and monitor all your crops in one place.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Crop
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead className="hidden md:table-cell">Acres</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Planting Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crops.map((crop) => (
                <TableRow key={crop.name}>
                  <TableCell className="font-medium">{crop.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{crop.acres}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`border-0 text-white ${statusColors[crop.status]}`}>
                      {crop.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{crop.plantingDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
