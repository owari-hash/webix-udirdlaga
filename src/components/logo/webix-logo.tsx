import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

type Props = {
  width?: number;
  height?: number;
  single?: boolean;
  sx?: any;
};

export default function WebixLogo({ width = 40, height = 40, single, sx }: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width,
        height,
        borderRadius: 1.5,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        position: 'relative',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {/* Logo Design */}
      <Box
        sx={{
          position: 'relative',
          width: '70%',
          height: '70%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Letter W */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 4L7 16L12 8L17 16L21 4"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="12" cy="12" r="1.5" fill="white" opacity="0.8" />
        </svg>
      </Box>

      {/* Accent decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: -10,
          right: -10,
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.2)',
        }}
      />
    </Box>
  );
}
