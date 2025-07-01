'use client';

import { MapPinIcon, SparklesIcon, GiftIcon } from '@heroicons/react/24/outline';
import { FORM_CONSTANTS } from '../constants';
import LocationSection from './LocationSection';
import TransportTypeSection from './TransportTypeSection';
import PublicTransportSection from './PublicTransportSection';
import PrivateVehicleSection from './PrivateVehicleSection';
import { motion } from 'framer-motion';

/**
 * Travel Information Section Component
 */
export default function TravelInfoSection({ 
  locale, 
  formData, 
  errors, 
  handleChange,
  handleLocationTypeChange,
  handleTransportTypeChange,
  handlePublicTransportChange,
  handlePrivateVehicleChange,
  handleFuelTypeChange,
  handleOtherPublicTransportChange,
  handleOtherPrivateVehicleChange,
  isOtherPublicTransportSelected,
  isOtherPrivateVehicleSelected,
  isFuelTypeOther,
  bangkokDistricts,
  provinces,
  otherFieldNames
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mt-8"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30 rounded-3xl pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-green-300/20 to-emerald-300/20 rounded-full blur-2xl"></div>
      
      <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/50 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-prompt font-bold text-slate-800 mb-2 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <MapPinIcon className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {locale === 'th' ? 'ข้อมูลการเดินทาง' : 'Travel Information'}
            </span>
          </h2>
          <p className="text-slate-600 font-prompt ml-14">
            {locale === 'th' 
              ? 'กรุณาให้ข้อมูลเกี่ยวกับการเดินทางมาร่วมงาน' 
              : 'Please provide information about your travel to the event'}
          </p>
        </motion.div>

        {/* Location Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <LocationSection 
            locale={locale}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleLocationTypeChange={handleLocationTypeChange}
            bangkokDistricts={bangkokDistricts}
            provinces={provinces}
          />
        </motion.div>
        
        {/* Transport Type Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <TransportTypeSection 
            locale={locale}
            formData={formData}
            errors={errors}
            handleTransportTypeChange={handleTransportTypeChange}
          />
        </motion.div>
        
        {/* Public Transport Section */}
        {formData.transport_type === FORM_CONSTANTS.TRANSPORT_TYPES.PUBLIC && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PublicTransportSection 
              locale={locale}
              formData={formData}
              errors={errors}
              handlePublicTransportChange={handlePublicTransportChange}
              isOtherPublicTransportSelected={isOtherPublicTransportSelected}
              handleOtherPublicTransportChange={handleOtherPublicTransportChange}
              otherFieldName={otherFieldNames.PUBLIC_TRANSPORT_OTHER}
            />
          </motion.div>
        )}
        
        {/* Private Vehicle Section */}
        {formData.transport_type === FORM_CONSTANTS.TRANSPORT_TYPES.PRIVATE && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PrivateVehicleSection 
              locale={locale}
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handlePrivateVehicleChange={handlePrivateVehicleChange}
              isOtherPrivateVehicleSelected={isOtherPrivateVehicleSelected}
              handleOtherPrivateVehicleChange={handleOtherPrivateVehicleChange}
              handleFuelTypeChange={handleFuelTypeChange}
              isFuelTypeOther={isFuelTypeOther}
            />
          </motion.div>
        )}
        
        {/* Special Souvenir Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-300/20 to-green-300/20 rounded-full blur-2xl"></div>
          
          <div className="relative p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <GiftIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <h3 className="text-lg font-prompt font-bold text-emerald-800 mr-2">
                    {locale === 'th' ? 'ของที่ระลึกพิเศษ' : 'Special Souvenir'}
                  </h3>
                  <div className="flex items-center px-3 py-1 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full border border-yellow-300">
                    <SparklesIcon className="w-4 h-4 mr-1 text-amber-600" />
                    <span className="text-xs font-prompt font-semibold text-amber-700">
                      {locale === 'th' ? 'จำนวนจำกัด' : 'Limited'}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-emerald-700 font-prompt leading-relaxed">
                  {locale === 'th' ? (
                    <>
                      CCI Climate Change Forum 2025 ขอเชิญชวนท่านร่วมลดการปล่อยคาร์บอนด้วยการเดินทางมาร่วมงานโดยระบบ
                      <span className="font-bold text-emerald-800"> ขนส่งมวลชน</span> หรือ
                      <span className="font-bold text-emerald-800"> การเดินเท้า</span> 
                      <br />
                      ผู้เข้าร่วมที่แสดงหลักฐานการเดินทางด้วยวิธีดังกล่าวจะได้รับของที่ระลึกพิเศษ
                    </>
                  ) : (
                    <>
                      The Climate Change Institute (CCI) of the Federation of Thai Industries invites you to help reduce carbon emissions by traveling to the event using 
                      <span className="font-bold text-emerald-800"> public transportation</span> or
                      <span className="font-bold text-emerald-800"> walking</span>.
                      <br />
                      Participants who show proof of travel by these methods will receive a special souvenir from the institute.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Floating decorative elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400/50 rounded-full blur-sm"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-emerald-400/50 rounded-full blur-sm"></div>
      </div>
    </motion.div>
  );
}