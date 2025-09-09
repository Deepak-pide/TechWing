"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/ui/dialog";
import CropForm from "./CropForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const initialCrops = [
  { id: 1, name: "Wheat", acres: 150, status: "Growing", plantingDate: "2024-03-15" },
  { id: 2, name: "Corn", acres: 100, status: "Harvested", plantingDate: "2024-04-01" },
  { id: 3, name: "Soybeans", acres: 80, status: "Growing", plantingDate: "2024-05-10" },
  { id: 4, name: "Potatoes", acres: 30, status: "Planting", plantingDate: "2024-06-01" },
  { id: 5, name: "Barley", acres: 75, status: "Harvested", plantingDate: "2024-03-20" },
];

const statusColors: { [key: string]: string } = {
  Growing: "bg-green-500",
  Harvested: "bg-yellow-500",
  Planting: "bg-blue-500",
};

export type Crop = {
  id: number;
  name: string;
  acres: number;
  status: "Growing" | "Harvested" | "Planting";
  plantingDate: string;
};

export default function CropsPage() {
  const [crops, setCrops] = useState<Crop[]>(initialCrops);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<Crop | undefined>(undefined);
  const { toast } = useToast();

  const handleAddClick = () => {
    setSelectedCrop(undefined);
    setIsFormOpen(true);
  };

  const handleEditClick = (crop: Crop) => {
    setSelectedCrop(crop);
    setIsFormOpen(true);
  };

  const handleDelete = (cropId: number) => {
    setCrops(crops.filter((crop) => crop.id !== cropId));
    toast({
        title: "Crop Deleted",
        description: "The crop has been successfully removed.",
    });
  };

  const handleSave = (cropData: Omit<Crop, 'id'>) => {
    if (selectedCrop) {
      // Edit
      setCrops(crops.map((crop) => (crop.id === selectedCrop.id ? { ...crop, ...cropData } : crop)));
      toast({
          title: "Crop Updated",
          description: "The crop details have been saved.",
      });
    } else {
      // Add
      const newId = crops.length > 0 ? Math.max(...crops.map(c => c.id)) + 1 : 1;
      setCrops([...crops, { id: newId, ...cropData }]);
      toast({
          title: "Crop Added",
          description: "The new crop has been added to your list.",
      });
    }
    setIsFormOpen(false);
  };
  
  // Note: "View Details" is not implemented as its functionality wasn't specified.
  // It could navigate to a dedicated page [id] or open another dialog.

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">My Crops</h1>
          <p className="text-muted-foreground">Manage and monitor all your crops in one place.</p>
        </div>
        <Button onClick={handleAddClick}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Crop
        </Button>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <CropForm 
            onSave={handleSave} 
            onCancel={() => setIsFormOpen(false)} 
            crop={selectedCrop}
        />
      </Dialog>

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
                <TableRow key={crop.id}>
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
                        <DropdownMenuItem onClick={() => handleEditClick(crop)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                             <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the crop from your list.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(crop.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
