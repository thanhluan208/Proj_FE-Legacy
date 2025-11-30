"use client";

import React from "react";
import { Tenant } from "@/types/tenants.type";
import {
  User,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  CreditCard,
  ChevronDown,
} from "lucide-react";

interface TenantCardProps {
  tenant: Tenant;
}

const TenantCard: React.FC<TenantCardProps> = ({ tenant }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status?: { name: string; color?: string }) => {
    if (!status) return "bg-gray-500";
    const color = status.color?.toLowerCase();
    switch (color) {
      case "green":
        return "bg-green-500";
      case "red":
        return "bg-red-500";
      case "blue":
        return "bg-blue-500";
      case "yellow":
        return "bg-yellow-500";
      case "gray":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Header with Status - Always Visible */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {tenant.name}
              </h3>
              {tenant.citizenId && (
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <CreditCard className="w-3 h-3" />
                  {tenant.citizenId}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {tenant.status && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(
                  tenant.status
                )}`}
              >
                {tenant.status.name}
              </span>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-accent/50 rounded-full transition-colors"
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Contact Info - Always Visible */}
        <div className="space-y-2">
          {tenant.phoneNumber && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{tenant.phoneNumber}</span>
            </div>
          )}

          {tenant.address && (
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
              <span className="text-foreground line-clamp-2">
                {tenant.address}
              </span>
            </div>
          )}
        </div>

        {/* Collapsible Content */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isExpanded
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden space-y-3">
            {/* Personal Info */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
              {tenant.dob && (
                <div>
                  <p className="text-xs text-muted-foreground">Date of Birth</p>
                  <p className="text-sm font-medium text-foreground">
                    {formatDate(tenant.dob)}
                  </p>
                </div>
              )}
              {tenant.sex && (
                <div>
                  <p className="text-xs text-muted-foreground">Gender</p>
                  <p className="text-sm font-medium text-foreground">
                    {tenant.sex}
                  </p>
                </div>
              )}
            </div>

            {/* Employment Info */}
            {(tenant.tenantJob || tenant.tenantWorkAt) && (
              <div className="pt-2 border-t border-border">
                <div className="flex items-start gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    {tenant.tenantJob && (
                      <p className="font-medium text-foreground">
                        {tenant.tenantJob}
                      </p>
                    )}
                    {tenant.tenantWorkAt && (
                      <p className="text-muted-foreground">
                        {tenant.tenantWorkAt}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Additional Info */}
            {(tenant.nationality || tenant.home) && (
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
                {tenant.nationality && (
                  <div>
                    <p className="text-xs text-muted-foreground">Nationality</p>
                    <p className="text-sm font-medium text-foreground">
                      {tenant.nationality}
                    </p>
                  </div>
                )}
                {tenant.home && (
                  <div>
                    <p className="text-xs text-muted-foreground">Hometown</p>
                    <p className="text-sm font-medium text-foreground">
                      {tenant.home}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center gap-2 pt-2 border-t border-border text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>Joined {formatDate(tenant.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantCard;
