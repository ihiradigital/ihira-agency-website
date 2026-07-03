import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import {
  COUNTRIES,
  PRIORITY_CODES,
  findByCode,
  getFlagEmoji,
  type Country,
} from '@/data/countries';

interface PhoneInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md';
}

const FALLBACK_COUNTRY = findByCode('US')!;

export function PhoneInput({
  id,
  value,
  onChange,
  required,
  theme = 'light',
  size = 'md',
}: PhoneInputProps) {
  const [selected, setSelected] = useState<Country>(FALLBACK_COUNTRY);
  const [local, setLocal] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [geoDetected, setGeoDetected] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (geoDetected) return;
    const controller = new AbortController();
    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then((r) => r.json())
      .then((data: { country_code?: string }) => {
        if (data.country_code) {
          const country = findByCode(data.country_code);
          if (country) {
            setSelected(country);
            setGeoDetected(true);
          }
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, [geoDetected]);

  const emitChange = useCallback(
    (country: Country, localNum: string) => {
      const digits = localNum.replace(/\D/g, '');
      const e164 = digits ? `+${country.dialCode}${digits}` : '';
      onChange(e164);
    },
    [onChange],
  );

  useEffect(() => {
    if (!value) {
      setLocal('');
      return;
    }
    if (value.startsWith('+')) {
      const digits = value.slice(1);
      for (const len of [4, 3, 2, 1]) {
        const prefix = digits.slice(0, len);
        const match = COUNTRIES.find((c) => c.dialCode === prefix);
        if (match) {
          setSelected(match);
          setLocal(digits.slice(len));
          return;
        }
      }
    }
    setLocal(value);
  }, [value]);

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dialCode.includes(search.replace('+', '')),
  );

  const priorityCountries = PRIORITY_CODES.map((code) =>
    findByCode(code),
  ).filter(Boolean) as Country[];

  const remainingCountries = filteredCountries.filter(
    (c) => !PRIORITY_CODES.includes(c.code),
  );

  function handleSelect(country: Country) {
    setSelected(country);
    setIsOpen(false);
    setSearch('');
    emitChange(country, local);
    triggerRef.current?.focus();
  }

  function handleLocalChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setLocal(raw);
    emitChange(selected, raw);
  }

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const isDark = theme === 'dark';
  const py = size === 'sm' ? 'py-2.5' : 'py-3';

  const inputBase = isDark
    ? `bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:ring-primary/60 focus:border-primary/60`
    : `bg-background border-input text-foreground placeholder:text-foreground/40 focus:ring-primary/50 focus:border-primary`;

  return (
    <div className="relative flex gap-2" ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Country code: ${selected.name} +${selected.dialCode}`}
        className={`flex items-center gap-1.5 border rounded-md px-3 ${py} text-sm font-medium transition-colors focus:outline-none focus:ring-2 ${inputBase} flex-shrink-0 min-w-[88px]`}
      >
        <span className="text-base leading-none">{getFlagEmoji(selected.code)}</span>
        <span className={`text-xs font-bold ${isDark ? 'text-white/70' : 'text-foreground/70'}`}>
          +{selected.dialCode}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 ${isDark ? 'text-white/40' : 'text-foreground/40'}`} />
      </button>

      <input
        id={id}
        type="tel"
        autoComplete="tel-national"
        required={required}
        value={local}
        onChange={handleLocalChange}
        placeholder="Phone number"
        className={`flex-1 border rounded-md px-3 ${py} text-sm font-medium transition-colors focus:outline-none focus:ring-2 ${inputBase}`}
        aria-label="Phone number"
      />

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select country code"
          className={`absolute z-50 top-full left-0 mt-1 w-72 rounded-xl shadow-2xl border overflow-hidden ${
            isDark
              ? 'bg-[#1a1f2e] border-white/10'
              : 'bg-white border-border'
          }`}
          style={{ maxHeight: '320px', display: 'flex', flexDirection: 'column' }}
        >
          <div className={`p-2 border-b flex-shrink-0 ${isDark ? 'border-white/10' : 'border-border'}`}>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${isDark ? 'text-white/30' : 'text-foreground/40'}`} />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search countries…"
                className={`w-full pl-8 pr-3 py-2 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 ${inputBase}`}
              />
            </div>
          </div>

          <div className="overflow-y-auto" style={{ flex: 1 }}>
            {!search && (
              <>
                <div className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-white/30' : 'text-foreground/40'}`}>
                  Suggested
                </div>
                {priorityCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    role="option"
                    aria-selected={selected.code === country.code}
                    onClick={() => handleSelect(country)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                      selected.code === country.code
                        ? isDark
                          ? 'bg-primary/20 text-primary'
                          : 'bg-primary/10 text-primary'
                        : isDark
                        ? 'text-white/80 hover:bg-white/5'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <span className="text-base">{getFlagEmoji(country.code)}</span>
                    <span className="flex-1 text-left font-medium text-xs">{country.name}</span>
                    <span className={`text-xs font-bold ${isDark ? 'text-white/40' : 'text-foreground/50'}`}>
                      +{country.dialCode}
                    </span>
                  </button>
                ))}
                <div className={`mx-3 my-1 border-t ${isDark ? 'border-white/10' : 'border-border'}`} />
                <div className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-white/30' : 'text-foreground/40'}`}>
                  All Countries
                </div>
              </>
            )}

            {remainingCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                role="option"
                aria-selected={selected.code === country.code}
                onClick={() => handleSelect(country)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                  selected.code === country.code
                    ? isDark
                      ? 'bg-primary/20 text-primary'
                      : 'bg-primary/10 text-primary'
                    : isDark
                    ? 'text-white/80 hover:bg-white/5'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <span className="text-base">{getFlagEmoji(country.code)}</span>
                <span className="flex-1 text-left font-medium text-xs">{country.name}</span>
                <span className={`text-xs font-bold ${isDark ? 'text-white/40' : 'text-foreground/50'}`}>
                  +{country.dialCode}
                </span>
              </button>
            ))}

            {filteredCountries.length === 0 && (
              <div className={`px-3 py-6 text-center text-sm ${isDark ? 'text-white/30' : 'text-foreground/40'}`}>
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
