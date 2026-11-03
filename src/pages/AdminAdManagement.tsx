import React, { useState } from 'react';
import {
  AdvertisementItem,
  AdSlotId,
  AdType,
  AdStatus,
  AD_SLOT_DEFINITIONS
} from '../types/advertisement';
import { useAds } from '../context/AdContext';
import {
  Sliders,
  Plus,
  Edit2,
  Trash2,
  Power,
  PowerOff,
  Eye,
  MousePointerClick,
  Percent,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  Upload,
  RefreshCw,
  Search,
  Filter,
  X,
  FileCode,
  Image as ImageIcon
} from 'lucide-react';

interface AdminAdManagementProps {
  onBackToSite: () => void;
}

export const AdminAdManagement: React.FC<AdminAdManagementProps> = ({ onBackToSite }) => {
  const {
    ads,
    getAdStatus,
    createAd,
    updateAd,
    deleteAd,
    toggleAdEnabled,
    resetToDefaults,
    highlightSlots,
    setHighlightSlots,
    totalImpressions,
    totalClicks,
    activeCount
  } = useAds();

  // Filters
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSlotFilter, setSelectedSlotFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<AdvertisementItem | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formSlotId, setFormSlotId] = useState<AdSlotId>('HOME_TOP_BANNER');
  const [formType, setFormType] = useState<AdType>('direct');
  const [formEnabled, setFormEnabled] = useState(true);
  const [formStartDate, setFormStartDate] = useState('');
  const [formEndDate, setFormEndDate] = useState('');

  // Direct Ad Form State
  const [formAdvertiser, setFormAdvertiser] = useState('');
  const [formTargetUrl, setFormTargetUrl] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formAltText, setFormAltText] = useState('');
  const [formHeadline, setFormHeadline] = useState('');
  const [formSubline, setFormSubline] = useState('');
  const [formCtaText, setFormCtaText] = useState('சலுகையை பெறுக');
  const [formThemeColor, setFormThemeColor] = useState('#881337');

  // AdSense Form State
  const [formPublisherId, setFormPublisherId] = useState('ca-pub-7198202611029876');
  const [formAdSlotId, setFormAdSlotId] = useState('');
  const [formAdFormat, setFormAdFormat] = useState<'auto' | 'horizontal' | 'rectangle' | 'vertical' | 'responsive'>('auto');
  const [formFullWidth, setFormFullWidth] = useState(true);

  // Custom HTML Form State
  const [formRawHtml, setFormRawHtml] = useState('');

  // File Upload Helper
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Create Modal
  const handleOpenCreate = (preselectedSlot?: AdSlotId) => {
    setEditingAd(null);
    setFormName('');
    setFormSlotId(preselectedSlot || 'HOME_TOP_BANNER');
    setFormType('direct');
    setFormEnabled(true);
    setFormStartDate(new Date().toISOString().split('T')[0]);
    setFormEndDate('');
    setFormAdvertiser('');
    setFormTargetUrl('https://');
    setFormImageUrl('');
    setFormAltText('');
    setFormHeadline('');
    setFormSubline('');
    setFormCtaText('விவரம் அறிய');
    setFormThemeColor('#881337');
    setFormPublisherId('ca-pub-7198202611029876');
    setFormAdSlotId(`${Math.floor(1000000000 + Math.random() * 9000000000)}`);
    setFormAdFormat('auto');
    setFormFullWidth(true);
    setFormRawHtml('');
    setModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (ad: AdvertisementItem) => {
    setEditingAd(ad);
    setFormName(ad.name);
    setFormSlotId(ad.slotId);
    setFormType(ad.type);
    setFormEnabled(ad.enabled);
    setFormStartDate(ad.startDate || '');
    setFormEndDate(ad.endDate || '');

    if (ad.directBanner) {
      setFormAdvertiser(ad.directBanner.advertiserName || '');
      setFormTargetUrl(ad.directBanner.targetUrl || '');
      setFormImageUrl(ad.directBanner.imageUrlDesktop || '');
      setFormAltText(ad.directBanner.altText || '');
      setFormHeadline(ad.directBanner.headlineTa || '');
      setFormSubline(ad.directBanner.sublineTa || '');
      setFormCtaText(ad.directBanner.ctaTextTa || 'விவரம் அறிய');
      setFormThemeColor(ad.directBanner.themeColor || '#881337');
    }

    if (ad.adSense) {
      setFormPublisherId(ad.adSense.publisherId || 'ca-pub-7198202611029876');
      setFormAdSlotId(ad.adSense.adSlotId || '');
      setFormAdFormat(ad.adSense.adFormat || 'auto');
      setFormFullWidth(ad.adSense.fullWidthResponsive ?? true);
    }

    if (ad.customHtml) {
      setFormRawHtml(ad.customHtml.rawHtml || '');
    }

    setModalOpen(true);
  };

  // Submit Handler
  const handleSaveAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const payload = {
      name: formName.trim(),
      slotId: formSlotId,
      type: formType,
      enabled: formEnabled,
      startDate: formStartDate || undefined,
      endDate: formEndDate || undefined,
      directBanner:
        formType === 'direct'
          ? {
              advertiserName: formAdvertiser || formName,
              targetUrl: formTargetUrl || 'https://',
              imageUrlDesktop: formImageUrl,
              altText: formAltText || formName,
              headlineTa: formHeadline,
              sublineTa: formSubline,
              ctaTextTa: formCtaText,
              themeColor: formThemeColor
            }
          : undefined,
      adSense:
        formType === 'adsense'
          ? {
              publisherId: formPublisherId,
              adSlotId: formAdSlotId || '1234567890',
              adFormat: formAdFormat,
              fullWidthResponsive: formFullWidth
            }
          : undefined,
      customHtml:
        formType === 'custom_html'
          ? {
              rawHtml: formRawHtml
            }
          : undefined
    };

    if (editingAd) {
      updateAd(editingAd.id, payload);
    } else {
      createAd(payload);
    }

    setModalOpen(false);
  };

  // Filter Ads
  const filteredAds = ads.filter((ad) => {
    const status = getAdStatus(ad);
    if (selectedStatus !== 'all' && status !== selectedStatus) return false;
    if (selectedSlotFilter !== 'all' && ad.slotId !== selectedSlotFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = ad.name.toLowerCase().includes(q);
      const matchSlot = ad.slotId.toLowerCase().includes(q);
      const matchAdvertiser = ad.directBanner?.advertiserName.toLowerCase().includes(q);
      if (!matchName && !matchSlot && !matchAdvertiser) return false;
    }
    return true;
  });

  // Calculate CTR
  const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';

  // Status Badge Component
  const renderStatusBadge = (status: AdStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Active (நேரலை)</span>
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 text-blue-600" />
            <span>Scheduled (திட்டமிடப்பட்டது)</span>
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-stone-200 text-stone-700">
            <AlertCircle className="w-3 h-3 text-stone-500" />
            <span>Expired (காலாவதியானது)</span>
          </span>
        );
      case 'inactive':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-red-100 text-red-800">
            <PowerOff className="w-3 h-3 text-red-600" />
            <span>Inactive (முடக்கப்பட்டது)</span>
          </span>
        );
    }
  };

  const allSlotIds = Object.keys(AD_SLOT_DEFINITIONS) as AdSlotId[];

  return (
    <div className="w-full min-h-screen bg-stone-100 py-6">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Top Header & Breadcrumb */}
        <div className="bg-white rounded border border-stone-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span>நிர்வாக பலகை (Admin Dashboard)</span>
              <span>/</span>
              <span className="text-red-900 font-semibold">விளம்பர மேலாண்மை</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-serif text-stone-900 flex items-center gap-2">
              <Sliders className="w-7 h-7 text-red-800" />
              <span>விளம்பர மேலாண்மை (Advertisement Management)</span>
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              TamizhAayvan தளத்தின் 12 விளம்பர இடங்கள், Google AdSense அலகுகள் மற்றும் நேரடி விளம்பரங்களை நிர்வகிக்கவும்.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setHighlightSlots(!highlightSlots)}
              className={`px-3 py-2 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors ${
                highlightSlots
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'bg-stone-200 hover:bg-stone-300 text-stone-800'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>{highlightSlots ? 'இடங்கள் தெரிகிறது' : 'விளம்பர இடங்களை காட்டு'}</span>
            </button>

            <button
              onClick={() => handleOpenCreate()}
              className="px-4 py-2 text-xs font-semibold bg-red-900 hover:bg-red-800 text-white rounded shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>புதிய விளம்பரம் சேர்க்க (New Ad)</span>
            </button>

            <button
              onClick={onBackToSite}
              className="px-4 py-2 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white rounded transition-colors"
            >
              செய்தித் தளம் காண்க
            </button>
          </div>
        </div>

        {/* 1. Analytics & KPI Overview Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white p-4 rounded border border-stone-200 shadow-xs">
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
              மொத்த இடங்கள்
            </div>
            <div className="text-2xl font-bold text-stone-900 mt-1 font-mono tabular-nums">
              12 Slots
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">முழுமையான கவரேஜ்</div>
          </div>

          <div className="bg-white p-4 rounded border border-stone-200 shadow-xs">
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
              நேரலை விளம்பரம்
            </div>
            <div className="text-2xl font-bold text-emerald-600 mt-1 font-mono tabular-nums">
              {activeCount}
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">Active Campaigns</div>
          </div>

          <div className="bg-white p-4 rounded border border-stone-200 shadow-xs">
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
              திட்டமிடப்பட்டது
            </div>
            <div className="text-2xl font-bold text-blue-600 mt-1 font-mono tabular-nums">
              {ads.filter((a) => getAdStatus(a) === 'scheduled').length}
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">Scheduled</div>
          </div>

          <div className="bg-white p-4 rounded border border-stone-200 shadow-xs">
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
              பார்வைகள் (Impressions)
            </div>
            <div className="text-2xl font-bold text-stone-900 mt-1 font-mono tabular-nums">
              {totalImpressions.toLocaleString()}
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">Zero CLS Tracking</div>
          </div>

          <div className="bg-white p-4 rounded border border-stone-200 shadow-xs">
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
              கிளிக்குகள் (Clicks)
            </div>
            <div className="text-2xl font-bold text-stone-900 mt-1 font-mono tabular-nums">
              {totalClicks.toLocaleString()}
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">Verified Interactions</div>
          </div>

          <div className="bg-white p-4 rounded border border-stone-200 shadow-xs">
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
              கிளிக் விகிதம் (CTR)
            </div>
            <div className="text-2xl font-bold text-amber-600 mt-1 font-mono tabular-nums">
              {ctr}%
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">Click-Through Rate</div>
          </div>
        </div>

        {/* 2. Slot Matrix Grid (All 12 Slot Identifiers) */}
        <div className="bg-white rounded border border-stone-200 p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-stone-200 gap-2">
            <div>
              <h2 className="text-base font-bold text-stone-900 font-serif flex items-center gap-2">
                <Layers className="w-4 h-4 text-red-800" />
                <span>அனைத்து 12 விளம்பர இடங்கள் (Slot Identification Matrix)</span>
              </h2>
              <p className="text-xs text-stone-500">
                ஒவ்வொரு விளம்பர இடமும் சுயாதீனமாக நிர்வகிக்கப்படக்கூடியது.
              </p>
            </div>
            <button
              onClick={resetToDefaults}
              className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1 self-start sm:self-auto px-2.5 py-1 rounded border border-stone-300 hover:bg-stone-50 transition-colors"
              title="இயல்புநிலைக்கு மீட்டமை"
            >
              <RefreshCw className="w-3 h-3" />
              <span>இயல்புநிலைக்கு மீட்டமை (Reset Defaults)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {allSlotIds.map((slotId) => {
              const def = AD_SLOT_DEFINITIONS[slotId];
              const assignedAd = ads.find((a) => a.slotId === slotId && a.enabled);
              const status = assignedAd ? getAdStatus(assignedAd) : 'inactive';

              return (
                <div
                  key={slotId}
                  className={`p-3.5 rounded border transition-all flex flex-col justify-between ${
                    assignedAd
                      ? 'border-stone-300 bg-white hover:border-red-800 shadow-2xs'
                      : 'border-dashed border-stone-300 bg-stone-50/70'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded">
                        {slotId}
                      </span>
                      {assignedAd ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-stone-300" title="Empty" />
                      )}
                    </div>

                    <h3 className="text-xs font-bold text-stone-900 leading-snug">
                      {def.nameTa}
                    </h3>
                    <div className="text-[10px] text-stone-500 font-mono mt-0.5">
                      {def.desktopSize} (D) / {def.mobileSize} (M)
                    </div>

                    <div className="mt-2 text-xs">
                      {assignedAd ? (
                        <div className="p-2 rounded bg-stone-50 border border-stone-200/80">
                          <div className="font-semibold text-stone-800 truncate text-[11px]">
                            {assignedAd.name}
                          </div>
                          <div className="flex items-center justify-between mt-1 text-[10px] text-stone-500">
                            <span className="uppercase">{assignedAd.type}</span>
                            <span className="font-mono tabular-nums">{assignedAd.impressions} imps</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-[11px] text-stone-400 italic py-1">
                          விளம்பரம் ஒதுக்கப்படவில்லை
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                    {assignedAd ? (
                      <button
                        onClick={() => handleOpenEdit(assignedAd)}
                        className="text-xs text-red-800 hover:text-red-950 font-semibold flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>மாற்றுக</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOpenCreate(slotId)}
                        className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>ஒதுக்குக</span>
                      </button>
                    )}

                    {assignedAd && (
                      <button
                        onClick={() => toggleAdEnabled(assignedAd.id)}
                        className={`text-[11px] font-medium px-2 py-0.5 rounded transition-colors ${
                          assignedAd.enabled
                            ? 'bg-red-50 text-red-700 hover:bg-red-100'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {assignedAd.enabled ? 'முடக்கு' : 'செயல்படுத்து'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Detailed Campaign List Table */}
        <div className="bg-white rounded border border-stone-200 p-5 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-4 border-b border-stone-200 gap-3">
            <div>
              <h2 className="text-base font-bold text-stone-900 font-serif">
                விளம்பர பிரச்சாரங்களின் பட்டியல் (All Ad Campaigns)
              </h2>
              <p className="text-xs text-stone-500">
                மொத்தம் {ads.length} விளம்பரங்கள் பதிவு செய்யப்பட்டுள்ளன.
              </p>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="தேடல்..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-red-800 w-36 sm:w-48"
                />
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs border border-stone-300 rounded px-2.5 py-1.5 focus:outline-none"
              >
                <option value="all">அனைத்து நிலைகளும் (All Status)</option>
                <option value="active">Active (நேரலை)</option>
                <option value="scheduled">Scheduled (திட்டமிடப்பட்டது)</option>
                <option value="inactive">Inactive (முடக்கப்பட்டது)</option>
                <option value="expired">Expired (காலாவதியானது)</option>
              </select>

              <select
                value={selectedSlotFilter}
                onChange={(e) => setSelectedSlotFilter(e.target.value)}
                className="text-xs border border-stone-300 rounded px-2.5 py-1.5 focus:outline-none max-w-[160px]"
              >
                <option value="all">அனைத்து இடங்களும்</option>
                {allSlotIds.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">விளம்பரம் / பிரச்சாரம்</th>
                  <th className="py-2.5 px-3">இடம் (Slot)</th>
                  <th className="py-2.5 px-3">வகை (Type)</th>
                  <th className="py-2.5 px-3">நிலை (Status)</th>
                  <th className="py-2.5 px-3">கால அளவு (Schedule)</th>
                  <th className="py-2.5 px-3 text-right">பார்வைகள்</th>
                  <th className="py-2.5 px-3 text-right">கிளிக்குகள்</th>
                  <th className="py-2.5 px-3 text-right">CTR</th>
                  <th className="py-2.5 px-3 text-center">செயல்கள்</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredAds.map((ad) => {
                  const status = getAdStatus(ad);
                  const adCtr =
                    ad.impressions > 0
                      ? ((ad.clicks / ad.impressions) * 100).toFixed(2)
                      : '0.00';

                  return (
                    <tr key={ad.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-semibold text-stone-900">{ad.name}</div>
                        {ad.directBanner?.advertiserName && (
                          <div className="text-[11px] text-stone-500">
                            {ad.directBanner.advertiserName}
                          </div>
                        )}
                        {ad.adSense && (
                          <div className="text-[10px] text-stone-400 font-mono">
                            Slot: {ad.adSense.adSlotId}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-mono font-medium text-[11px] bg-stone-100 px-1.5 py-0.5 rounded text-stone-700">
                          {ad.slotId}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="uppercase text-[11px] font-semibold text-stone-600">
                          {ad.type === 'direct' && 'Direct Banner'}
                          {ad.type === 'adsense' && 'Google AdSense'}
                          {ad.type === 'custom_html' && 'Custom HTML'}
                        </span>
                      </td>

                      <td className="py-3 px-3">{renderStatusBadge(status)}</td>

                      <td className="py-3 px-3 text-stone-500 font-mono text-[11px]">
                        {ad.startDate ? ad.startDate : 'உடனடி'}
                        {ad.endDate ? ` வரை ${ad.endDate}` : ' (முடிவிலி)'}
                      </td>

                      <td className="py-3 px-3 text-right font-mono tabular-nums text-stone-700">
                        {ad.impressions.toLocaleString()}
                      </td>

                      <td className="py-3 px-3 text-right font-mono tabular-nums text-stone-700">
                        {ad.clicks.toLocaleString()}
                      </td>

                      <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-amber-700">
                        {adCtr}%
                      </td>

                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => toggleAdEnabled(ad.id)}
                            className={`p-1.5 rounded transition-colors ${
                              ad.enabled
                                ? 'text-emerald-700 hover:bg-emerald-50'
                                : 'text-stone-400 hover:bg-stone-100'
                            }`}
                            title={ad.enabled ? 'முடக்கு' : 'செயல்படுத்து'}
                          >
                            <Power className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(ad)}
                            className="p-1.5 rounded text-stone-600 hover:text-red-900 hover:bg-stone-100 transition-colors"
                            title="திருத்து"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`"${ad.name}" விளம்பரத்தை நிச்சயமாக நீக்க விரும்புகிறீர்களா?`)) {
                                deleteAd(ad.id);
                              }
                            }}
                            className="p-1.5 rounded text-stone-400 hover:text-red-700 hover:bg-stone-100 transition-colors"
                            title="நீக்கு"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredAds.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-stone-400 text-xs italic">
                      தேடலுக்குரிய விளம்பரங்கள் ஏதும் இல்லை.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Google AdSense & Direct Advertising Compliance Guide */}
        <div className="bg-amber-50/70 rounded border border-amber-200 p-5 text-xs text-stone-700 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
            <CheckCircle2 className="w-4 h-4 text-amber-800" />
            <span>Google AdSense & தொழில்முறை விளம்பர விதிகளுக்குரிய இணக்கத்தன்மை</span>
          </div>
          <p className="leading-relaxed">
            - அனைத்து 12 விளம்பர இடங்களும் கூகிள் ஆட்சென்ஸ் கொள்கைகளுக்கு ஏற்ப உரை, படங்கள் மற்றும் கட்டுரைகளின் தலைப்புகளை மறைக்காதவாறு துல்லியமாக ஒருங்கிணைக்கப்பட்டுள்ளன.
          </p>
          <p className="leading-relaxed">
            - லேஅவுட் ஷிப்ட் (CLS) ஏற்படுவதைத் தடுக்க தேவையான பரிமாணங்கள் முன் கூட்டியே ஒதுக்கப்பட்டுள்ளன.
          </p>
          <p className="leading-relaxed">
            - உங்கள் சொந்த Google AdSense கணக்கின் வெளியீட்டாளர் ஐடி (ca-pub-XXXXXXXXXXXXXXXX) மற்றும் ஸ்லாட் ஐடிகளை மேலே உள்ள &apos;மாற்றுக&apos; பொத்தான் வழியாக எந்த நேரத்திலும் உள்ளிடலாம்.
          </p>
          <div className="pt-2 border-t border-amber-200/80 flex flex-wrap items-center gap-4 text-amber-950 font-medium">
            <span>நிர்வாக உதவி & விளம்பர தொடர்புகள்:</span>
            <a href="mailto:dbirddigital@gmail.com" className="underline hover:text-red-900">
              dbirddigital@gmail.com
            </a>
            <span>·</span>
            <a href="tel:+919025180407" className="underline font-mono hover:text-red-900">
              +91 9025180407
            </a>
          </div>
        </div>
      </div>

      {/* 5. Create / Edit Advertisement Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8 overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-serif">
                  {editingAd ? 'விளம்பரத்தைத் திருத்துக (Edit Advertisement)' : 'புதிய விளம்பரம் உருவாக்குக (Create Advertisement)'}
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  இடத்தைத் தேர்வு செய்து விளம்பர விவரங்களை உள்ளிடவும்.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveAd} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              {/* Campaign Name */}
              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  விளம்பரப் பிரச்சாரத்தின் பெயர் (Campaign Name) *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="உதாரணம்: பொங்கல் பண்டிகை தங்க நகை தள்ளுபடி சலுகை"
                  className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-red-800 focus:outline-none"
                />
              </div>

              {/* Slot Target & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    விளம்பர இடம் (Ad Slot Target) *
                  </label>
                  <select
                    value={formSlotId}
                    onChange={(e) => setFormSlotId(e.target.value as AdSlotId)}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-red-800 focus:outline-none font-mono text-xs"
                  >
                    {allSlotIds.map((id) => (
                      <option key={id} value={id}>
                        {id} - {AD_SLOT_DEFINITIONS[id].nameTa}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-stone-500 mt-1">
                    பரிமாணம்: {AD_SLOT_DEFINITIONS[formSlotId].desktopSize} (டெஸ்க்டாப்)
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    விளம்பர வகை (Ad Type) *
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as AdType)}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-red-800 focus:outline-none text-xs"
                  >
                    <option value="direct">நேரடி பேனர் விளம்பரம் (Direct Advertiser Banner)</option>
                    <option value="adsense">Google AdSense யூனிட் (AdSense Code Unit)</option>
                    <option value="custom_html">தனிப்பயன் HTML / ஸ்கிரிப்ட் (Custom HTML)</option>
                  </select>
                </div>
              </div>

              {/* Schedule & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-stone-50 p-3 rounded border border-stone-200">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">தொடக்கத் தேதி (Start)</label>
                  <input
                    type="date"
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full px-2 py-1.5 border border-stone-300 rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">முடிவுத் தேதி (End Date)</label>
                  <input
                    type="date"
                    value={formEndDate}
                    onChange={(e) => setFormEndDate(e.target.value)}
                    className="w-full px-2 py-1.5 border border-stone-300 rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">நிலை (Status)</label>
                  <button
                    type="button"
                    onClick={() => setFormEnabled(!formEnabled)}
                    className={`w-full py-1.5 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      formEnabled
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-300 text-stone-700'
                    }`}
                  >
                    {formEnabled ? <Power className="w-3.5 h-3.5" /> : <PowerOff className="w-3.5 h-3.5" />}
                    <span>{formEnabled ? 'செயலில் உள்ளது (Enabled)' : 'முடக்கப்பட்டது'}</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Fields for Direct Banner */}
              {formType === 'direct' && (
                <div className="space-y-3 pt-2 border-t border-stone-200">
                  <div className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-red-800" />
                    <span>நேரடி விளம்பரதாரர் விவரங்கள் (Direct Advertiser)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">விளம்பரதாரர் பெயர் (Advertiser) *</label>
                      <input
                        type="text"
                        value={formAdvertiser}
                        onChange={(e) => setFormAdvertiser(e.target.value)}
                        placeholder="எ.கா. Sri Kumaran Thangamaligai"
                        className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">செல்ல வேண்டிய URL (Target URL) *</label>
                      <input
                        type="url"
                        value={formTargetUrl}
                        onChange={(e) => setFormTargetUrl(e.target.value)}
                        placeholder="https://example.com/offer"
                        className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">முக்கிய வாசகம் (Headline - Tamil)</label>
                      <input
                        type="text"
                        value={formHeadline}
                        onChange={(e) => setFormHeadline(e.target.value)}
                        placeholder="எ.கா. சேதாரம் இல்லை · பவுனுக்கு சிறப்பு தள்ளுபடி"
                        className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">பொத்தான் உரை (CTA Text)</label>
                      <input
                        type="text"
                        value={formCtaText}
                        onChange={(e) => setFormCtaText(e.target.value)}
                        placeholder="எ.கா. சலுகையை பெறுக / முன்பதிவு"
                        className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">விளக்க உரை (Subline Details)</label>
                    <input
                      type="text"
                      value={formSubline}
                      onChange={(e) => setFormSubline(e.target.value)}
                      placeholder="எ.கா. 100% BIS 916 ஹால்மார்க் நகைகள் · தமிழ்நாடு முழுவதும் 40 கிளைகள்"
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                    />
                  </div>

                  {/* Banner Image Upload or Image URL */}
                  <div className="p-3 bg-stone-50 rounded border border-stone-200 space-y-2">
                    <label className="block font-semibold text-stone-800">
                      பேனர் படம் பதிவேற்றம் (Upload Banner Image) அல்லது URL
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="text-xs file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-red-900 file:text-white hover:file:bg-red-800 cursor-pointer"
                      />
                      <span className="text-stone-400">அல்லது</span>
                      <input
                        type="text"
                        value={formImageUrl}
                        onChange={(e) => setFormImageUrl(e.target.value)}
                        placeholder="பட URL உள்ளிடவும் (https://...)"
                        className="flex-1 px-2.5 py-1.5 border border-stone-300 rounded bg-white text-xs w-full"
                      />
                    </div>
                    {formImageUrl && (
                      <div className="mt-2 text-emerald-700 text-[11px] flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>படம் தேர்வு செய்யப்பட்டுள்ளது</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Dynamic Fields for Google AdSense */}
              {formType === 'adsense' && (
                <div className="space-y-3 pt-2 border-t border-stone-200">
                  <div className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-emerald-700" />
                    <span>Google AdSense உள்ளமைவு (AdSense Configuration)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        AdSense Publisher ID (ca-pub-XXXXX) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formPublisherId}
                        onChange={(e) => setFormPublisherId(e.target.value)}
                        placeholder="ca-pub-7198202611029876"
                        className="w-full px-2.5 py-1.5 border border-stone-300 rounded font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Ad Slot ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={formAdSlotId}
                        onChange={(e) => setFormAdSlotId(e.target.value)}
                        placeholder="4829104821"
                        className="w-full px-2.5 py-1.5 border border-stone-300 rounded font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">Ad Format</label>
                      <select
                        value={formAdFormat}
                        onChange={(e) => setFormAdFormat(e.target.value as any)}
                        className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                      >
                        <option value="auto">auto (தானியங்கி ரெஸ்பான்சிவ்)</option>
                        <option value="horizontal">horizontal (கிடைமட்ட லீடர்போர்டு)</option>
                        <option value="rectangle">rectangle (செவ்வக கட்டம் 300x250)</option>
                        <option value="vertical">vertical (செங்குத்து பேனர் 300x600)</option>
                      </select>
                    </div>

                    <div className="flex items-center pt-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formFullWidth}
                          onChange={(e) => setFormFullWidth(e.target.checked)}
                          className="rounded text-red-900 focus:ring-red-900"
                        />
                        <span className="text-stone-700 font-medium">
                          data-full-width-responsive (முழு அகல ரெஸ்பான்சிவ்)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Fields for Custom HTML */}
              {formType === 'custom_html' && (
                <div className="space-y-3 pt-2 border-t border-stone-200">
                  <div className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-purple-700" />
                    <span>தனிப்பயன் HTML விளம்பர குறியீடு (Custom HTML Code)</span>
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      HTML / Iframe / Script Creative *
                    </label>
                    <textarea
                      rows={4}
                      value={formRawHtml}
                      onChange={(e) => setFormRawHtml(e.target.value)}
                      placeholder="<a href='https://...'><img src='https://...' /></a>"
                      className="w-full p-2.5 border border-stone-300 rounded font-mono text-[11px]"
                    />
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded text-stone-700 hover:bg-stone-50"
                >
                  ரத்து செய்க (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-900 hover:bg-red-800 text-white font-semibold rounded shadow-xs"
                >
                  {editingAd ? 'மாற்றங்களை சேமிக்கவும்' : 'விளம்பரத்தை உருவாக்கவும்'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
