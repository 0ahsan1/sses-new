import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Zap, Calendar } from "lucide-react";

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: "Residential Solar System - DHA Karachi",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800",
    location: "Defence, Karachi",
    capacity: "10kW",
    savings: "₨18,000/month",
    date: "Dec 2024",
    type: "Residential",
    description: "Complete off-grid solar solution for a luxury home with battery backup system"
  },
  {
    id: 2,
    title: "Commercial Solar Installation - Gulshan",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800",
    location: "Gulshan-e-Iqbal, Karachi",
    capacity: "50kW",
    savings: "₨75,000/month",
    date: "Nov 2024",
    type: "Commercial",
    description: "Net-metering system for office building reducing electricity costs by 80%"
  },
  {
    id: 3,
    title: "Industrial Solar Project - SITE",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800",
    location: "SITE Industrial Area, Karachi",
    capacity: "200kW",
    savings: "₨2,50,000/month",
    date: "Oct 2024",
    type: "Industrial",
    description: "Large-scale hybrid solar system for textile manufacturing facility"
  }
];

export default function ProjectShowcase({ projects = [] }) {
  projects.length = 2
  const [activeProject, setActiveProject] = useState(0);
  const [projectItems, setProjectItems] = useState(DEFAULT_PROJECTS);

  // Memoize the mapped projects to prevent unnecessary recalculations
  const mappedProjects = useMemo(() => {
    if (!projects || projects.length === 0) return null;
    
    return projects.map(project => ({
      id: project.id,
      title: project.title || 'Solar Project',
      image: project.image?.url || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
      location: project.location || 'Karachi',
      capacity: project.capacity || 'N/A',
      savings: project.savings || 'Significant',
      date: project.date || '2024',
      type: project.type || 'Solar',
      description: project.description?.[0]?.children?.[0]?.text || 'Solar energy installation project'
    }));
  }, [projects]);

  // Update project items when mapped projects change
  useEffect(() => {
    if (mappedProjects) {
      setProjectItems(mappedProjects);
    } else {
      setProjectItems(DEFAULT_PROJECTS);
    }
    console.log('mappedProjects',mappedProjects)
  }, [mappedProjects]);

  if (projectItems.length === 0) return null;

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Recent Solar Installations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our latest solar projects across Pakistan and see the real impact
            we're making for homes and businesses.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Project Navigation */}
          <div className="space-y-6">
            {projectItems.map((project, index) => (
              <div
                key={project.id || index}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeProject === index
                    ? "bg-orange-50 border-2 border-orange-200 shadow-lg"
                    : "bg-white border-2 border-gray-100 hover:border-orange-100 hover:shadow-md"
                }`}
                onClick={() => setActiveProject(index)}
              >
                <div className="flex items-start justify-between mb-4">
                  <Badge
                    variant="secondary"
                    className={`${
                      project.type === 'Residential' ? 'bg-blue-100 text-blue-800' :
                      project.type === 'Commercial' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {project.type}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.date}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center text-orange-600 mb-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-xs">Location</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{project.location}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-orange-600 mb-1">
                      <Zap className="w-4 h-4 mr-1" />
                      <span className="text-xs">Capacity</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{project.capacity}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-orange-600 text-xs mb-1">Monthly Savings</div>
                    <div className="text-sm font-medium text-gray-900">{project.savings}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Project Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px] hidden lg:block">
            {projectItems[activeProject]?.image && (
              <img
                src={projectItems[activeProject].image}
                alt={projectItems[activeProject].title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {projectItems[activeProject]?.title}
                </h3>
                <p className="text-gray-200">
                  {projectItems[activeProject]?.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
            View All Projects
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}