import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Zap, DollarSign, Leaf } from "lucide-react";

export default function BudgetCalculator() {
  const [formData, setFormData] = useState({
    monthlyBill: '',
    propertyType: '',
    location: '',
    roofArea: ''
  });
  const [results, setResults] = useState(null);

  const calculateSolar = () => {
    const monthlyBill = parseFloat(formData.monthlyBill) || 0;
    const systemSize = Math.ceil(monthlyBill * 0.15); // Rough estimation
    const totalCost = systemSize * 120000; // PKR per kW
    const monthlySavings = monthlyBill * 0.8;
    const paybackPeriod = Math.ceil(totalCost / (monthlySavings * 12));
    const co2Savings = systemSize * 1.2; // tons per year

    setResults({
      systemSize,
      totalCost,
      monthlySavings,
      paybackPeriod,
      co2Savings
    });
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Solar Savings Calculator
          </h2>
          <p className="text-xl text-gray-600">
            Discover how much you can save with solar energy in Pakistan
          </p>
        </div>

        <div className="grid lg:grid-cols-2 ">
          {/* Calculator Form */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg py-4">
              <CardTitle className="flex items-center text-2xl">
                <Calculator className="w-6 h-6 mr-3" />
                Calculate Your Savings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Electricity Bill (PKR)
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 15000"
                  value={formData.monthlyBill}
                  onChange={(e) => setFormData({...formData, monthlyBill: e.target.value})}
                  className="text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => setFormData({...formData, propertyType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="agricultural">Agricultural</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({...formData, location: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="karachi">Karachi</SelectItem>
                    <SelectItem value="lahore">Lahore</SelectItem>
                    <SelectItem value="islamabad">Islamabad</SelectItem>
                    <SelectItem value="faisalabad">Faisalabad</SelectItem>
                    <SelectItem value="multan">Multan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Roof Area (sq ft)
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 500"
                  value={formData.roofArea}
                  onChange={(e) => setFormData({...formData, roofArea: e.target.value})}
                />
              </div>

              <Button 
                onClick={calculateSolar}
                className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-3"
                disabled={!formData.monthlyBill}
              >
                Calculate My Savings
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {results ? (
              <>
                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Zap className="w-8 h-8 text-orange-500 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">Your Solar System</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-3xl font-bold text-orange-600">{results.systemSize}kW</div>
                        <div className="text-gray-600">System Size</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-3xl font-bold text-green-600">₨{results.totalCost.toLocaleString()}</div>
                        <div className="text-gray-600">Total Investment</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <DollarSign className="w-8 h-8 text-green-500 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">Monthly Savings</h3>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        ₨{results.monthlySavings.toLocaleString()}
                      </div>
                      <div className="text-gray-600 mb-4">
                        Payback Period: {results.paybackPeriod} years
                      </div>
                      <div className="bg-green-100 p-3 rounded-lg">
                        <div className="text-sm text-green-800">
                          25-year savings: ₨{(results.monthlySavings * 12 * 25).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Leaf className="w-8 h-8 text-green-500 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">Environmental Impact</h3>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {results.co2Savings} tons/year
                      </div>
                      <div className="text-gray-600">CO₂ Emissions Saved</div>
                    </div>
                  </CardContent>
                </Card>

                <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-4">
                  Get Detailed Quote Now
                </Button>
              </>
            ) : (
              <div className="text-center py-20">
                <Calculator className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Calculate?
                </h3>
                <p className="text-gray-600">
                  Fill in your details to see personalized solar savings estimates for your property
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}