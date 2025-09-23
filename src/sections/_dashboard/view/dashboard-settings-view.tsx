'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const SETTINGS_SECTIONS = [
  {
    id: 'general',
    title: 'Ерөнхий тохиргоо',
    icon: 'solar:settings-bold',
    color: 'primary',
  },
  {
    id: 'security',
    title: 'Аюулгүй байдал',
    icon: 'solar:shield-check-bold',
    color: 'error',
  },
  {
    id: 'notifications',
    title: 'Мэдэгдэл',
    icon: 'solar:bell-bold',
    color: 'warning',
  },
  {
    id: 'system',
    title: 'Системийн тохиргоо',
    icon: 'solar:server-bold',
    color: 'info',
  },
  {
    id: 'billing',
    title: 'Төлбөр',
    icon: 'solar:dollar-minimalistic-bold',
    color: 'success',
  },
  {
    id: 'api',
    title: 'API тохиргоо',
    icon: 'solar:code-bold',
    color: 'secondary',
  },
];

const GENERAL_SETTINGS = [
  {
    key: 'siteName',
    label: 'Сайтын нэр',
    value: 'Webix Multitenant Platform',
    type: 'text',
  },
  {
    key: 'siteDescription',
    label: 'Сайтын тайлбар',
    value: 'Вэбтоон олон байгууллагын платформ',
    type: 'textarea',
  },
  {
    key: 'defaultLanguage',
    label: 'Үндсэн хэл',
    value: 'mn',
    type: 'select',
    options: [
      { value: 'mn', label: 'Монгол' },
      { value: 'en', label: 'English' },
    ],
  },
  {
    key: 'timezone',
    label: 'Цагийн бүс',
    value: 'Asia/Ulaanbaatar',
    type: 'select',
    options: [
      { value: 'Asia/Ulaanbaatar', label: 'Улаанбаатар (UTC+8)' },
      { value: 'UTC', label: 'UTC (UTC+0)' },
    ],
  },
  {
    key: 'maintenanceMode',
    label: 'Засварын горим',
    value: false,
    type: 'switch',
  },
];

const SECURITY_SETTINGS = [
  {
    key: 'twoFactorAuth',
    label: 'Хоёр хүчин зүйлийн баталгаажуулалт',
    value: true,
    type: 'switch',
  },
  {
    key: 'passwordMinLength',
    label: 'Нууц үгийн хамгийн бага урт',
    value: '8',
    type: 'number',
  },
  {
    key: 'sessionTimeout',
    label: 'Сешний хүчинтэй байх хугацаа (минут)',
    value: '30',
    type: 'number',
  },
  {
    key: 'maxLoginAttempts',
    label: 'Хамгийн их нэвтрэх оролдлого',
    value: '5',
    type: 'number',
  },
  {
    key: 'ipWhitelist',
    label: 'IP цагаан жагсаалт',
    value: '',
    type: 'textarea',
  },
];

const NOTIFICATION_SETTINGS = [
  {
    key: 'emailNotifications',
    label: 'Имэйл мэдэгдэл',
    value: true,
    type: 'switch',
  },
  {
    key: 'pushNotifications',
    label: 'Push мэдэгдэл',
    value: true,
    type: 'switch',
  },
  {
    key: 'systemAlerts',
    label: 'Системийн анхааруулга',
    value: true,
    type: 'switch',
  },
  {
    key: 'userActivity',
    label: 'Хэрэглэгчийн үйл ажиллагаа',
    value: false,
    type: 'switch',
  },
];

// ----------------------------------------------------------------------

export default function DashboardSettingsView() {
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState<Record<string, any>>({
    ...GENERAL_SETTINGS.reduce((acc, setting) => ({ ...acc, [setting.key]: setting.value }), {}),
    ...SECURITY_SETTINGS.reduce((acc, setting) => ({ ...acc, [setting.key]: setting.value }), {}),
    ...NOTIFICATION_SETTINGS.reduce(
      (acc, setting) => ({ ...acc, [setting.key]: setting.value }),
      {}
    ),
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    // Here you would typically save to backend
  };

  const renderSettingField = (setting: any) => {
    switch (setting.type) {
      case 'switch':
        return (
          <Switch
            checked={settings[setting.key]}
            onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
          />
        );
      case 'textarea':
        return (
          <TextField
            multiline
            rows={3}
            fullWidth
            value={settings[setting.key]}
            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
          />
        );
      case 'select':
        return (
          <TextField
            select
            fullWidth
            value={settings[setting.key]}
            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
            SelectProps={{ native: true }}
          >
            {setting.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        );
      case 'number':
        return (
          <TextField
            type="number"
            fullWidth
            value={settings[setting.key]}
            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
          />
        );
      default:
        return (
          <TextField
            fullWidth
            value={settings[setting.key]}
            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
          />
        );
    }
  };

  const getCurrentSettings = () => {
    switch (activeSection) {
      case 'general':
        return GENERAL_SETTINGS;
      case 'security':
        return SECURITY_SETTINGS;
      case 'notifications':
        return NOTIFICATION_SETTINGS;
      default:
        return GENERAL_SETTINGS;
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Settings Sidebar */}
        <Card sx={{ width: 280, p: 2, height: 'fit-content' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Тохиргооны хэсгүүд
          </Typography>
          <Stack spacing={1}>
            {SETTINGS_SECTIONS.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? 'contained' : 'text'}
                startIcon={
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(
                        (theme.palette as any)[section.color].main,
                        activeSection === section.id ? 0.2 : 0.08
                      ),
                      color: (theme.palette as any)[section.color].main,
                    }}
                  >
                    <Iconify icon={section.icon} width={14} />
                  </Box>
                }
                onClick={() => setActiveSection(section.id)}
                sx={{
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  mb: 0.5,
                }}
              >
                {section.title}
              </Button>
            ))}
          </Stack>
        </Card>

        {/* Settings Content */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
            >
              <Typography variant="h6">
                {SETTINGS_SECTIONS.find((s) => s.id === activeSection)?.title}
              </Typography>
              <Button
                variant="contained"
                onClick={handleSave}
                startIcon={<Iconify icon="solar:diskette-bold" width={16} />}
              >
                Хадгалах
              </Button>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Stack spacing={3}>
              {getCurrentSettings().map((setting) => (
                <Box key={setting.key} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ minWidth: 200 }}>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      {setting.label}
                    </Typography>
                    {setting.type === 'switch' && (
                      <Typography variant="caption" color="text.secondary">
                        {settings[setting.key] ? 'Идэвхтэй' : 'Идэвхгүй'}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ flex: 1, maxWidth: 400 }}>{renderSettingField(setting)}</Box>
                </Box>
              ))}
            </Stack>
          </Card>

          {/* Additional Info Card */}
          <Card sx={{ mt: 3, p: 3, bgcolor: alpha(theme.palette.info.main, 0.04) }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Iconify icon="solar:info-circle-bold" width={24} color={theme.palette.info.main} />
              <Box>
                <Typography variant="subtitle2" color="info.main" sx={{ mb: 0.5 }}>
                  Анхааруулга
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Тохиргооны өөрчлөлт нь бүх байгууллагад нөлөөлнө. Өөрчлөхөөсөө өмнө сайтар
                  бодоорой.
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
