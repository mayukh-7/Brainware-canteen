
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import { menuCategories } from "@/data/categories";
import { menuItems } from "@/data/items";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(menuItems);

  useEffect(() => {
    let filtered = menuItems;

    // Filter by category
    if (activeCategory !== "all") {
      const categoryId = parseInt(activeCategory);
      filtered = filtered.filter((item) => item.category === categoryId);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    setFilteredItems(filtered);
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (value) => {
    setActiveCategory(value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Our Menu</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our selection of delicious meals, snacks, and beverages. Order online for quick pickup at the canteen.
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for food, ingredients, or categories..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {/* Category Tabs */}
          <Tabs
            defaultValue="all"
            value={activeCategory}
            onValueChange={handleCategoryChange}
            className="mb-8"
          >
            <div className="overflow-x-auto pb-2">
              <TabsList className="inline-flex w-auto p-1 bg-muted">
                <TabsTrigger value="all" className="px-4">
                  All Items
                </TabsTrigger>
                {menuCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id.toString()}
                    className="px-4"
                  >
                    {category.icon} {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Food Items Grid */}
            <TabsContent value={activeCategory} className="mt-6">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-500">
                    No items found matching your search criteria.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <AnimatePresence>
                    {filteredItems.map((item) => (
                      <FoodCard key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Dietary Information */}
          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Dietary Information</h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="bg-white">
                Vegetarian
              </Badge>
              <Badge variant="outline" className="bg-white">
                Vegan
              </Badge>
              <Badge variant="outline" className="bg-white">
                Gluten-Free Options
              </Badge>
              <Badge variant="outline" className="bg-white">
                Dairy-Free Options
              </Badge>
              <Badge variant="outline" className="bg-white">
                Nut-Free Options
              </Badge>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Please inform our staff of any allergies or dietary requirements when ordering. 
              Allergen information is available upon request.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MenuPage;
